import { Injectable, OnInit } from '@angular/core';
import { ServicioDatosService } from './servicio-datos.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService implements OnInit {

  clientes!:any;
  vehiculos!:any; 
  constructor(private servicioDatosService: ServicioDatosService) { }


  ngOnInit(): void {
    /* this.getVehiculos();*/
    //this.getClientes();       
  }

  getClientes(){
    this.servicioDatosService.getAll("clientes").subscribe (
      datos => {this.clientes = datos;    
        console.log("get all clientes",  this.clientes)  
      }      
    );
  }

  getVehiculos(){
    this.servicioDatosService.getAll("vehiculos").subscribe (
      datos => {this.vehiculos = datos;    
        console.log("get all vehiculos",  this.vehiculos)  
      }      
    );
  }

  buscarPatente(patente:string){
    let vehiculos = JSON.parse(localStorage.getItem("vehiculos")||`{}`)
    let datosCliente;
    let respuesta:any ={
      clienteExiste:"",
      datosVehiculo:"",
      /* datosTarifa:"", */    }
    
    console.log(vehiculos);
    
    //la funcion filter recorre el array y devuelve un objeto que coincida con la patente buscada
    //reescribe el mismo array
    //si encuentra una coincidencia, el array tiene un objeto
    //si no encuentra nada, esta vacio
    vehiculos = vehiculos.filter(function(vehiculo:any){
      return vehiculo.patente === patente;
    }); 
    console.log(vehiculos[0]);


    if(vehiculos.length === 0){
      alert("esta cliente NO existe en la base de datos")
      respuesta.clienteExiste = false
      return respuesta
    } else{
      alert("esta cliente existe")
      respuesta.datosVehiculo = vehiculos[0];
      respuesta.clienteExiste = true;
      /* respuesta.datosTarifa = this.buscarTarifa(vehiculos[0].idTarifa) */
      return respuesta;
    }

  }

  buscarTarifa(id:number){
    let tarifas = JSON.parse(localStorage.getItem("tarfias")||`{}`)
    console.log(tarifas);
    
    tarifas = tarifas.filter(function(tarifa:any){
      return tarifa.id === id;
    }); 

    console.log(tarifas);
    return tarifas; 
  }
}
