import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbFirestoreService } from '../database/db-firestore.service';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { InitializerService } from '../initializer/initializer.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth2 = getAuth();

  logged$ = new BehaviorSubject<boolean>(false);

  usuario: any;

  constructor(
    private auth: Auth,
    private dbFirebase: DbFirestoreService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,// NgZone service to remove outside scope warning
    public initializerService: InitializerService // inicializa datos aplicacion
  ) { }

  // loginWithGoogle() {
  //   return signInWithPopup(this.auth, new GoogleAuthProvider());
  // }

  async loginWithGoogle() {
    const res = await this.AuthLogin(new auth.GoogleAuthProvider());
    this.router.navigate(['/home']);
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      this.router.navigate(['/home']);

      this.SetUsuario(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  /* Setting up user data when sign in with username/password, 
sign up with username/password and sign in with social auth  
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUsuario(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      //interface User
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  logout() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  isLoggedIn() {
    console.log('esto pasa por isLoggedIn');
    onAuthStateChanged(this.auth2, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        localStorage.setItem(`user`, JSON.stringify(user));
        // this.LogIn();
        //console.log("esto es el user", user);
        //console.log("esto es el user.uid", uid);
        
        this.getUsuario(uid);
        this.initializerService.getTodo()
      } else {
        // User is signed out
        // ...
        localStorage.removeItem(`user`);
        localStorage.clear();
        // this.LogOut();
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }



  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      // aca va interface usuario
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  getUsuario(id: string) {
    this.dbFirebase.getUsuarioUid(id).subscribe((data) => {
      this.usuario = data;
      localStorage.setItem(`usuario`, JSON.stringify(data));
      console.log('este es el usuario nuestro: ', this.usuario);
      this.setearColeccion();
    });
  }

  setearColeccion() {
    this.dbFirebase.setearColeccion(this.usuario.coleccion);
  }
}
