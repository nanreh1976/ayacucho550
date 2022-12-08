import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './servicios/autentificacion/auth.service';
import { DbFirestoreService } from './servicios/database/db-firestore.service';

import { LoggedService } from './servicios/logged.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LinkinPark';
  $estado;

  clientes!:any;
  vehiculos!:any;
  tarifas!:any;

  constructor(private loggedService: LoggedService, private router: Router,private dbFirebase: DbFirestoreService, private authService: AuthService) {
    this.$estado = authService.logged$;
  }
  ngOnInit(): void {
    this.$estado.subscribe;  
  }
}
