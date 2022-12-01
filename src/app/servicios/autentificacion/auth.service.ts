import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BehaviorSubject, Observable } from 'rxjs';
import { DbFirestoreService } from '../database/db-firestore.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth2 = getAuth();

  logged$ = new BehaviorSubject<boolean>(false);

  usuario:any;

  constructor(private auth: Auth, private dbFirebase: DbFirestoreService) {}

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {    
    return signOut(this.auth);
  }

  isLoggedIn() {
    console.log("esto pasa por isLoggedIn");
    onAuthStateChanged(this.auth2, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;        
        // ...
        localStorage.setItem(`user`, JSON.stringify(user))
        this.LogIn();
        //console.log("esto es el user", user);        
        //console.log("esto es el user.uid", uid);
        this.getUsuario(uid);
        
      } else {
        // User is signed out
        // ...
        localStorage.removeItem(`user`)
        localStorage.clear();
        this.LogOut()
      }
    });
    
  }

  LogIn(){
    this.logged$.next(true);
  }
  
  LogOut(){
    this.logged$.next(false);
  }
  
  LogState() {
    return this.logged$.asObservable();
  }

  mantenerseLogueado(){
    if(sessionStorage.getItem('user')){
      this.LogIn();
      console.log("prueba")
    }
  }

  getUsuario(id:string){
    this.dbFirebase.getUsuarioUid(id).subscribe(data => {
      this.usuario = data;
      localStorage.setItem(`usuario`, JSON.stringify(data))
      console.log("este es el usuario nuestro: ", this.usuario);
      this.setearColeccion(); 
    })
  }

  setearColeccion() {
    this.dbFirebase.setearColeccion(this.usuario.coleccion)
  }

  
}