import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarPatenteService {

  dominios: any = {
    patentesViejas : /^[a-zA-Z]{3}[\d]{3}$/,
    patentesNuevas : /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/,
    patentesMotosViejas : /^[0-9]{3}[a-zA-Z]{3}$/,
    patentesMotosNuevas : /^[a-zA-Z]{1}[0-9]{3}[a-zA-Z]{3}$/,
    
  }  


  constructor() { }

  validarPatente(patente: string) {                                                            
    
    if(this.dominios.patentesViejas.test(patente)){
      //alert("es una patente vieja válida");                      
      return true;
      } else if (this.dominios.patentesNuevas.test(patente)){
        //alert("es una patente nueva válida");         
        return true;
      } else if (this.dominios.patentesMotosViejas.test(patente)){
        //alert("es una patente de moto vieja válida");              
        return true;
      } else if (this.dominios.patentesMotosNuevas.test(patente)){
        //alert("es una patente de moto nueva válida");              
        return true;
        
      }  else {
        //alert("no es una patente válida");
        return false;
       }
  }
  
}
