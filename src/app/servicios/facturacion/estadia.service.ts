import { Injectable } from '@angular/core';
import { Tarifas } from 'src/app/interfaces/tarifas';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class EstadiaService {
  constructor(private storageService: StorageService) {
    this.storageService.tarifas$.subscribe((data) => (this.tarifas$ = data));
  }
  tarifas$: any;
  tarifaBase: Tarifas;
  saldo: number;
  valorTarifa: number;
  unidadesFraccion: number;

  minutosTolerancia: number;
  minutosResto: number;

  saldoEstadia(tarifas: Tarifas, minutosEstadia: number) {
    if (tarifas.categoria === 'promo') {
      this.getTarifaBasica(tarifas.vehiculo);
    }

    this.valorTarifa = parseInt(tarifas.valor);
    this.unidadesFraccion = this.fraccionMinutos(tarifas, minutosEstadia);
    this.minutosTolerancia = parseInt(tarifas.tolerancia);
    this.minutosResto = Math.floor(minutosEstadia % parseInt(tarifas.fraccion)); //esto transforma en un entero el resto de la division

    switch (tarifas.unidad_tiempo) {
      case 'dia':
      case 'semana':
      case 'mes':
      case 'semestral':
        this.saldo = 0;
        return this.saldo;
      //break;
      case 'minutos':
        if (this.unidadesFraccion < 2) {
          //si es menos de una hora, cobra una hora
          this.saldo = this.valorTarifa * 2;
          return this.saldo;
        } else {
          this.unidadesFraccion = Math.floor(this.unidadesFraccion); //averigua cuantas fracciones enteras se consumieron
          if (this.minutosResto <= this.minutosTolerancia) {
            //si esta dentro del margen de tolerancia, calcula el saldo con las fracciones enteras ya consumidas
            this.saldo = this.valorTarifa * this.unidadesFraccion;
            return this.saldo;
          } else {
            //si esta por fuera del margen de tolerancia, le agrega una fraccion mas y calcula el saldo
            this.saldo = this.valorTarifa * (this.unidadesFraccion + 1);
            return this.saldo;
          }
        }

      //        break;
      case 'hora':
        if (this.unidadesFraccion <= 1) {
          //si es menos de la fraccion de la promo, se cobra la tarifa minima
          this.saldo = this.valorTarifa;
          return this.saldo;
        } else {
          let minutosExtra = minutosEstadia - tarifas.fraccion * 60; //calcula cuantos minutos se excede de la promo
          if (minutosExtra <= this.minutosTolerancia) {
            //si esta dentro del margen de tolerancia inicial, calcula el saldo con las fracciones enteras ya consumidas
            this.saldo = this.valorTarifa ;
            return this.saldo;
          } else {
            //si esta por fuera del margen de tolerancia, le agrega una fraccion mas y calcula el saldo
            let fraccionesExtras = minutosExtra / parseInt(this.tarifaBase.fraccion); //las minutos q exceden la promo estadia dividido la fraccion minima de la tarifa base, da cuantas fracciones se consumieron

            let unidadesExtraFraccion = Math.floor(fraccionesExtras); //averigua cuantas fracciones enteras se consumieron
            let minutosExtraResto = Math.floor(
              minutosExtra % parseInt(this.tarifaBase.fraccion)
            ); //esto transforma en un entero el resto de la division
            if (minutosExtraResto <= parseInt(this.tarifaBase.tolerancia)) {
              //si esta dentro del margen de tolerancia, calcula el saldo con las fracciones enteras ya consumidas
              //let adicional:number = this.tarifaBase.valor * unidadesExtraFraccion
              //this.saldo = this.sumar(this.valorTarifa, adicional);
              //console.log(this.saldo);
              this.saldo = this.valorTarifa+(parseInt(this.tarifaBase.valor) * unidadesExtraFraccion);
             // console.log(this.saldo)
              return this.saldo;
            } else {
              //si esta por fuera del margen de tolerancia, le agrega una fraccion mas y calcula el saldo
              //let adicional:number = this.tarifaBase.valor * (unidadesExtraFraccion + 1)
              //this.saldo = this.sumar(this.valorTarifa, adicional);
             
              
              this.saldo = this.valorTarifa+(parseInt(this.tarifaBase.valor) * (unidadesExtraFraccion + 1));
            //  console.log(this.saldo);
              return this.saldo;
            }
          }
        }
      default:
        return (this.saldo = 0);
    }
  }

  fraccionMinutos(tarifas: Tarifas, minutosEstadia: number) {
    switch (tarifas.unidad_tiempo) {
      case 'minutos': {
        return minutosEstadia / tarifas.fraccion; //la estadia dividido la fraccion minima de la tarifa, da cuantas fracciones se consumieron
      }
      case 'hora': {
        return minutosEstadia / (tarifas.fraccion * 60); //la estadia dividido la fraccion minima de la tarifa pasada a minutos, da cuantas fracciones se consumieron
      }
      default:
        return 0;
    }
  }

  getTarifaBasica(vehiculo: string) {
    let tarifasGuardadas = this.tarifas$;

    tarifasGuardadas = tarifasGuardadas.filter(function (tarifa: any) {
      return tarifa.categoria === `${vehiculo}-base`;
    });

    this.tarifaBase = tarifasGuardadas[0];
   // console.log("esta es la tarifa base: ", this.tarifaBase);
  }

  sumar(valor1:number, valor2:number): number {
    return valor1+valor2;
  }
  
}
