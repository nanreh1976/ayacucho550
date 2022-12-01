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

// propiedades servicios logged 
  //$estado: BehaviorSubject<boolean>;

 /*  logIn(): void {
    this.loggedService.LogIn();
    this.router.navigate(['home']) //se agrega la routa a donde navegar
    //this.closeModal();
    
  } */

  constructor( private router: Router, private readonly authService: AuthService, private initializerService: InitializerService) { 

    /* this.$estado = loggedService.logged$ */
  } 

  ngOnInit(): void {
    //this.$estado.subscribe
  }
/*   
  volverHome(){   
    this.router.navigate(['']) //se agrega la routa a donde navegar
  }

  closeModal() {
    this.activeModal.close();
  }

 */

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()     
      .then(() => this.authService.isLoggedIn())
      
      //.then(() => this.router.navigate(['/playa']))             
      .then(() => this.accionAsincrona())      
      .then(() => this.initializerService.getTodo())
      .then(() => this.router.navigate(['/playa']))             
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
