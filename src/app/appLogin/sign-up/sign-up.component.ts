import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/autentificacion/auth.service';
import { InitializerService } from 'src/app/servicios/initializer/initializer.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService,
    private initializerService: InitializerService) {}

  ngOnInit(): void {
  }


  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.authService.isLoggedIn())

      //.then(() => this.router.navigate(['/playa']))             
      //.then(() => this.accionAsincrona())
      .then(() => this.initializerService.getTodo())
      //.then(() => this.router.navigate(['/home']))
      .catch((e) => console.log(e.message));
  }

}
