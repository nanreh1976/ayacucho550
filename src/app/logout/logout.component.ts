import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/autentificacion/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService
      .logout()
      .catch((e) => console.log(e.message));
  }
}
