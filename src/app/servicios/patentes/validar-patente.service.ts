import { Injectable } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { PlayaI } from 'src/app/interfaces/playaI';

@Injectable({
  providedIn: 'root',
})
export class ValidarPatenteService implements Validator {
  dominios: any = {
    patentesViejas: /^[a-zA-Z]{3}[\d]{3}$/,
    patentesNuevas: /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/,
    patentesMotosViejas: /^[0-9]{3}[a-zA-Z]{3}$/,
    patentesMotosNuevas: /^[a-zA-Z]{1}[0-9]{3}[a-zA-Z]{3}$/,
    barCode: /^[a-zA-Z]{3}[\-]{1}/,
  };

  // BARCODES //

  // Chequear si es barcode
  isBarCode(str: string) {
    return this.dominios.barCode.test(str);
  }

  // PATENTES //
  patentesPlaya!: any;
  vehiculo: PlayaI[];

  constructor() {}
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

  evaluarPatente(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      this.validarPatente(control.value)
        ? null
        : { patenteErronea: control.value };
  }

  // patente -> booolea
  validarPatente(patente: string) {
    return (
      this.dominios.patentesViejas.test(patente) ||
      this.dominios.patentesNuevas.test(patente) ||
      this.dominios.patentesMotosViejas.test(patente) ||
      this.dominios.patentesMotosNuevas.test(patente) ||
      this.dominios.barCode.test(patente)
    );
  }
 
  // patente ->playa -> boolean
  buscarPatentePlaya(patente: string, playa: any) {
    // devuelve TRUE  si la patente existe en playa
    let enPlaya = playa.filter(function (playa: any) {
      return playa.patente === patente;
    });

    return enPlaya.length === 0;
  }

  // patente -> playa -> vehiculo
  traerVehiculoPorPatente(patente: string, playa: any) {
    // devuelve el item que coincide con la patente
    let enPlaya = playa.filter(function (playa: any) {
      return playa.patente === patente;
    });

    console.log(this.patentesPlaya);
    return enPlaya[0];
  }
}
