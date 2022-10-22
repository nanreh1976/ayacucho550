import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Fechas } from 'src/app/interfaces/fechas';

@Injectable({
  providedIn: 'root'
})
export class CalculoFechasService {



  constructor() { }

  fechaActual(){
    moment.locale("es");
    return new Date(); 
  }

  fechaDia(fecha:Date){
    return moment(fecha).format('L');                               // desgloza la fecha en formato (DD/MM/YYYY) y devuelve un string
  }

  fechaHora(fecha:Date){
    return moment(fecha).format('LTS');                            // desgloza la fecha en formato (hh:mm:ss) y devuelve un string
  }

  pruebaCierreHora(fecha:string){  
    // pruebas para ver como obtener la diferencia entre ingreso y Salida
    
    /* let fecha1= "20/10/2022"
    let fecha2= "10:34:57"
    let fechaCierre = new Date()  
    let fechaDePrueba= moment(`${fecha1}${fecha2}`, "DDTMMTYYYYhhmmss").diff(fechaCierre, "minutes");   // entrega la diferencia entre la fecha ingresada y el momento actual en minutos
    console.log(fechaDePrueba); */
    
    let pruebaCierreHora= moment(fecha).diff(new Date(),"minutes");   // entrega la diferencia entre la fecha ingresada y el momento actual en minutos
    console.log(pruebaCierreHora);
    
  }



} 




