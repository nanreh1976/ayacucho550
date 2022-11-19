import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth2 = getAuth();

  logged$ = new BehaviorSubject<boolean>(false);

  constructor(private auth: Auth) {

    onAuthStateChanged(this.auth2, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;        
        // ...
        localStorage.setItem(`user`, JSON.stringify(user))
        this.LogIn()
        
      } else {
        // User is signed out
        // ...
        localStorage.removeItem(`user`)
        this.LogOut()
      }
    });

  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  isLoggedIn() {
    
    
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

  
}
