import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedService } from './servicios/logged.service';
import { ServicioDatosService } from './servicios/servicio-datos.service';

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

  constructor(private loggedService: LoggedService, private router: Router, private servicioDatosService: ServicioDatosService) {
    this.$estado = loggedService.logged$;
  }
  ngOnInit(): void {
    this.$estado.subscribe;
   // console.log("esta pasando por el app component!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.getClientes();
    this.getVehiculos();
    this.getTarifas();
    this.comprobarEstado();
  }

  comprobarEstado(): void {
    if (this.$estado.value) {

      this.router.navigate(['playa'])
      //console.log("logueado");
      //console.log(this.$estado);


    } else {
     //console.log("no logueado");

      this.router.navigate(['login'])
    }
  }

  getClientes(){
    this.servicioDatosService.getAll("clientes").subscribe (
      datos => {this.clientes = datos;    
        console.log("get all clientes",  this.clientes);
        localStorage.setItem('clientes', JSON.stringify(this.clientes));  
      }      
    );    
  }

  getVehiculos(){
    this.servicioDatosService.getAll("vehiculos").subscribe (
      datos => {this.vehiculos = datos;    
        console.log("get all vehiculos",  this.vehiculos)
        localStorage.setItem('vehiculos', JSON.stringify(this.vehiculos));    
      }      
    );
    
    
  }

  getTarifas(){
    this.servicioDatosService.getAll("tarifas").subscribe (
      datos => {this.tarifas = datos;    
        console.log("get all tarifas",  this.tarifas)
        localStorage.setItem('tarifas', JSON.stringify(this.tarifas));    
      }      
    );
    
    
  }


}
