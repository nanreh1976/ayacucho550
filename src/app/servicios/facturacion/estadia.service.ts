import { Injectable } from '@angular/core';
import { Tarifas } from 'src/app/interfaces/tarifas';

@Injectable({
  providedIn: 'root'
})
export class EstadiaService {

  constructor() { }

  tarifaBase: Tarifas;
  saldo:number; 
  valorTarifa: number;  
  unidadesFraccion:number; 

  minutosTolerancia: number;
  minutosResto: number;

  saldoEstadia(tarifas:Tarifas, minutosEstadia:number){

    //console.log("este es el servicio tarifas. tarifas: ", tarifas);    
    if(tarifas.categoria === "promo"){
      this.getTarifaBasica(tarifas.vehiculo);
    }

    
    this.valorTarifa = tarifas.valor;  

    //let unidadesFraccion:number = minutosEstadia/tarifas.fraccion       //la estadia dividido la fraccion minima de la tarifa, da cuantas fracciones se consumieron 
    this.unidadesFraccion = this.fraccionMinutos(tarifas,  minutosEstadia);

    this.minutosTolerancia = tarifas.tolerancia;
    this.minutosResto = Math.floor(minutosEstadia % tarifas.fraccion)    //esto transforma en un entero el resto de la division

    /* let minutosExtras:number;
    let fraccionesExtras:number; */


    switch (tarifas.unidad_tiempo) {
      case "mes":
      case "semanas":
        this.saldo = 0 ;
        return this.saldo;         
        //break;
      case "minutos":
        if (this.unidadesFraccion < 2){                                          //si es menos de una hora, cobra una hora
          this.saldo = this.valorTarifa * 2
          return this.saldo
        } else{
            this.unidadesFraccion = Math.floor(this.unidadesFraccion);                //averigua cuantas fracciones enteras se consumieron 
            if (this.minutosResto <= this.minutosTolerancia){                         //si esta dentro del margen de tolerancia, calcula el saldo con las fracciones enteras ya consumidas
              this.saldo = this.valorTarifa * this.unidadesFraccion;
              return this.saldo;    
            } else {                                                        //si esta por fuera del margen de tolerancia, le agrega una fraccion mas y calcula el saldo
              this.saldo = this.valorTarifa * (this.unidadesFraccion+1);
              return this.saldo;    
            }
        } 
      
//        break;      
        case "hora":
                
                if (this.unidadesFraccion <= 1){                                          //si es menos de la fraccion de la promo, se cobra la tarifa minima
                  this.saldo = this.valorTarifa * tarifas.fraccion;
                  return this.saldo
                } else{
                  let minutosExtra = minutosEstadia - (tarifas.fraccion*60)               //calcula cuantos minutos se excede de la promo
                    //unidadesFraccion = Math.floor(unidadesFraccion);                //averigua cuantas fracciones enteras se consumieron 
                    if (minutosExtra <= this.minutosTolerancia){                         //si esta dentro del margen de tolerancia inicial, calcula el saldo con las fracciones enteras ya consumidas
                      this.saldo = this.valorTarifa * tarifas.fraccion;
                      return this.saldo;    
                    } else {                                                      //si esta por fuera del margen de tolerancia, le agrega una fraccion mas y calcula el saldo
                      let fraccionesExtras = minutosExtra/this.tarifaBase.fraccion                     //las minutos q exceden la promo estadia dividido la fraccion minima de la tarifa base, da cuantas fracciones se consumieron 
                      
                          let unidadesExtraFraccion = Math.floor(fraccionesExtras);                //averigua cuantas fracciones enteras se consumieron 
                          let minutosExtraResto = Math.floor(minutosExtra % this.tarifaBase.fraccion)    //esto transforma en un entero el resto de la division
                          if (minutosExtraResto <= this.minutosTolerancia){                         //si esta dentro del margen de tolerancia, calcula el saldo con las fracciones enteras ya consumidas
                            this.saldo = (this.valorTarifa * tarifas.fraccion) + this.tarifaBase.valor * unidadesExtraFraccion;
                            return this.saldo;    
                          } else {                                                        //si esta por fuera del margen de tolerancia, le agrega una fraccion mas y calcula el saldo
                            this.saldo = (this.valorTarifa * tarifas.fraccion) + this.tarifaBase.valor * (unidadesExtraFraccion+1) ; 
                            return this.saldo;    
                          }
                      
                      
                    } 
                  
                } 
      default:
        return this.saldo=0

    }
    
    //fracion = 30 minutos
    //tarifa = $150 los 30 minutos
    

  }  

  fraccionMinutos(tarifas:Tarifas,  minutosEstadia:number) {
    switch (tarifas.unidad_tiempo) {
      case "minutos":{
        return minutosEstadia/tarifas.fraccion       //la estadia dividido la fraccion minima de la tarifa, da cuantas fracciones se consumieron 
      }
      case "hora":{
        return minutosEstadia/(tarifas.fraccion*60)       //la estadia dividido la fraccion minima de la tarifa pasada a minutos, da cuantas fracciones se consumieron 
      }
      default:
        return 0;
    }
  }

  getTarifaBasica(vehiculo:string){
    console.log("esto es el vehiculo q recibe: ", vehiculo);
    
    let tarifasGuardadas =  JSON.parse(localStorage.getItem("tarifas")||`{}`)
    console.log("todas las tarifas: ", tarifasGuardadas);
    
    tarifasGuardadas = tarifasGuardadas.filter(function(tarifa:any){
      return tarifa.categoria === `${vehiculo}-base`;
    }); 

    console.log("la tarifa base: ", tarifasGuardadas);

    this.tarifaBase = tarifasGuardadas[0]
    console.log(this.tarifaBase);
    
    
  }

  
}




