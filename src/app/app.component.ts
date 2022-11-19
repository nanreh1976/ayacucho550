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
  title = 'proyecto-final-7380';
  $estado;

  clientes!:any;
  vehiculos!:any;
  tarifas!:any;

  constructor(private loggedService: LoggedService, private router: Router,private dbFirebase: DbFirestoreService, private authService: AuthService) {
    this.$estado = authService.logged$;
  }
  ngOnInit(): void {
    this.$estado.subscribe;
   // console.log("esta pasando por el app component!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.getClientes();
    this.getVehiculos();
    this.getTarifas();
    this.comprobarEstado();
    //console.log(this.$estado.value);
  }

   comprobarEstado(): void {
   console.log(this.$estado.value);
    if (this.$estado.value) {

      this.router.navigate(['playa'])
      //console.log("logueado");
      //console.log(this.$estado);


    } else {
     //console.log("no logueado");

      //this.router.navigate(['login'])
    }
  } 

  getClientes(){
    this.dbFirebase.getAll("clientes").subscribe(data => {
      this.clientes = data;
      localStorage.setItem(`${"clientes"}`, JSON.stringify(this.clientes))
      console.log(this.clientes);      
    })
  }

  getVehiculos(){
    this.dbFirebase.getAll("vehiculos").subscribe(data => {
      this.vehiculos = data;
      localStorage.setItem(`${"vehiculos"}`, JSON.stringify(this.vehiculos))
      console.log(this.vehiculos);      
    })
  }

  getTarifas(){
    this.dbFirebase.getAll("tarifas").subscribe(data => {
      this.tarifas = data;
      localStorage.setItem(`${"tarifas"}`, JSON.stringify(this.tarifas))
      console.log(this.tarifas);      
    })
  }


}
