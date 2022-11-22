import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ConsultaFacturacion } from 'src/app/interfaces/consulta-facturacion';

@Injectable({
  providedIn: 'root'
})
export class ConsultaFacturacionService {

  consultaFacturacion={
    fechaDesde : "",
    fechaHasta : "",
    cantidadOperacion: 0,
    total: 0,
  } 
   //consultaFacturacion!:ConsultaFacturacion

  

  constructor() { }

  calcularFacturacion(fechas: any, facturacion: any) {
  
    //console.log("servicio del facturacion, facturacion: ", facturacion);
   
    let facturacionFiltrada = facturacion.filter((factura: any) => {

      factura.fechas.fechaSalidaDate = factura.fechas.fechaSalidaDate.toString();
      //console.log("esto es la fecha de salida: ", factura.fechas.fechaSalidaDate);
      


      let fechaSalidaMilisegundos = new Date(factura.fechas.fechaSalidaDate).getTime()
      //console.log("servicio del facturacion, fecha salida: ", fechaSalidaMilisegundos);
      
      return fechaSalidaMilisegundos > fechas.fechaDesde && fechaSalidaMilisegundos < fechas.fechaHasta
    })  

    this.consultaFacturacion.fechaDesde = this.convertirMilisegundosAFecha(fechas.fechaDesde); 
    this.consultaFacturacion.fechaHasta = this.convertirMilisegundosAFecha(fechas.fechaHasta)
    this.consultaFacturacion.cantidadOperacion = facturacionFiltrada.length;
    this.consultaFacturacion.total = this.calularTotal(facturacionFiltrada);
    //console.log(this.consultaFacturacion); 
    //return this.ConsultaFacturacion

    let respuestaFacturacion = {
      consultaFacturacion: this.consultaFacturacion,
      facturacion : facturacionFiltrada,
    }

    //console.log(respuestaFacturacion);
    return respuestaFacturacion;
    
  }

  convertirMilisegundosAFecha(numero:number) {
    //console.log(numero);   
    let date = moment(numero).format("DD MMM YYYY hh:mm a") 
  //  console.log(date);
    return date;
    
  }


    calularTotal(facturacion:any) {
      let acumulador = 0;
      facturacion.forEach((factura:any ) => {                 //por cada data de facturacion
        let dato = factura                                  //lo guarda en una nueva variable (pq sino no lo reconocia) 
        //console.log(dato);    
        acumulador = acumulador + dato.saldo;         //saca el saldo y lo guarda en un acumulador
        
      });
     // console.log(acumulador);
      return acumulador   
  }
}
