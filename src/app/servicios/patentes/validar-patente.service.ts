import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { ServicioDatosService } from '../servicio-datos.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarPatenteService implements Validator {

  dominios: any = {
    patentesViejas : /^[a-zA-Z]{3}[\d]{3}$/,
    patentesNuevas : /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/,
    patentesMotosViejas : /^[0-9]{3}[a-zA-Z]{3}$/,
    patentesMotosNuevas : /^[a-zA-Z]{1}[0-9]{3}[a-zA-Z]{3}$/,
    
  }  

  patentesPlaya!:any;


  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

  evaluarPatente(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null =>  
    this.validarPatente(control.value)?
    
         null : {"patenteErronea": control.value};
  }

  validarPatente(patente:string) {                                                            
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

  buscarPatentePlaya(patente:string, playa:any){
    this.patentesPlaya = playa
     
    console.log(playa);
    console.log(patente)

    //la funcion filter recorre el array y devuelve un objeto que coincida con la patente buscada
    //reescribe el mismo array
    //si encuentra una coincidencia, el array tiene un objeto
    //si no encuentra nada, esta vacio
    this.patentesPlaya = this.patentesPlaya.filter(function(patentesPlaya:any){
      return patentesPlaya.patente === patente;
    });
    //console.log(this.patentesPlaya);


    if(this.patentesPlaya.length === 0){
      //alert("esta patente NO existe en la playa")
      return true
    } else{
      //alert("esta patente ya fue ingresada")
      return false
    }

  }
  
}
