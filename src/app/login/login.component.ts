import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../servicios/autentificacion/auth.service';
import { InitializerService } from '../servicios/initializer/initializer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// propiedades servicio modal

  
  hide = true;
  spinner:boolean = false;



  constructor( private router: Router, 
    private readonly authService: AuthService, private initializerService: InitializerService) { 


  } 

  ngOnInit(): void {

  }


  loginWithGoogle() {
    this.authService
      .loginWithGoogle()     
      .then(() => this.authService.isLoggedIn())
      
      //.then(() => this.router.navigate(['/playa']))             
      .then(() => this.accionAsincrona())      
      .then(() => this.initializerService.getTodo())
      .then(() => this.router.navigate(['/home']))             
      .catch((e) => console.log(e.message));
  }

  accionAsincrona = async () => {
    console.log("pasa por aca 1?");
    this.spinner = true;
    return new Promise<void>((resolve, reject) => {
      console.log("pasa por aca 2?");
    setTimeout(() => {  
        resolve();         
    }, 3000);    
  })
    
    .then(() => {
      console.log("pasa por aca 3?");
      this.spinner = false;
    });   
  }  


  
}
