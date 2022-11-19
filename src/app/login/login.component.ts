import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../servicios/autentificacion/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// propiedades servicio modal

  
  hide = true;

// propiedades servicios logged 
  //$estado: BehaviorSubject<boolean>;

 /*  logIn(): void {
    this.loggedService.LogIn();
    this.router.navigate(['home']) //se agrega la routa a donde navegar
    //this.closeModal();
    
  } */

  constructor( private router: Router, private readonly authService: AuthService) { 

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
      .then(() => this.router.navigate(['/home']))
      .catch((e) => console.log(e.message));
  }

}
