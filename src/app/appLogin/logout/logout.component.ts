import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/autentificacion/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

data$:any

  constructor(private authService: AuthService,
    private storage:StorageService) {
  }

  ngOnInit(): void {
    this.storage.usuario$
    .subscribe(data => this.data$ = data);
    console.log(this.data$)
  }

  logout() {
    this.authService
      .SignOut()
      // .catch((e) => console.log(e.message));
  }
}
