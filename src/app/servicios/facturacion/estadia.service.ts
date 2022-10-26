import { Injectable } from '@angular/core';
import { Tarifas } from 'src/app/interfaces/tarifas';

@Injectable({
  providedIn: 'root'
})
export class EstadiaService {

  constructor() { }

  saldoEstadia(tarifas:Tarifas, minutosEstadia:number){
    //fracion = 30 minutos
    //tarifa = $150 los 30 minutos
    let saldo:number; 
    let valorTarifa: number = tarifas.valor;  

    let unidadesFraccion:number = minutosEstadia/tarifas.fraccion       //la estadia dividido la fraccion minima de la tarifa, da cuantas fracciones se consumieron 

    let minutosTolerancia: number = 5;
    let minutosResto = Math.floor(minutosEstadia % tarifas.fraccion)    //esto transforma en un entero el resto de la division

    if (unidadesFraccion < 2){                                          //si es menos de una hora, cobra una hora
      saldo = valorTarifa * 2
      return saldo
    } else{
        unidadesFraccion = Math.floor(unidadesFraccion);                //averigua cuantas fracciones enteras se consumieron 
        if (minutosResto <= minutosTolerancia){                         //si esta dentro del margen de tolerancia, calcula el saldo con las fracciones enteras ya consumidas
          saldo = valorTarifa * unidadesFraccion;
          return saldo;    
        } else {                                                        //si esta por fuera del margen de tolerancia, le agrega una fraccion mas y calcula el saldo
          saldo = valorTarifa * (unidadesFraccion+1);
          return saldo;    
        }
    } 
  }
}




