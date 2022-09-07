import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})

// Base de datos "en el server"
export class DataService implements InMemoryDbService {
  createDb() {
    const xp = [

      {
        id: 1,
        patente: "AG 759 LH",
        marca:"Ford",
        modelo:"Sierra",
        color:"blanco",
        ingreso:"00",
        egreso: "00"
      },
      {
        id: 2,
        patente: "AX 512 LH",
        marca:"Renault",
        modelo:"Fuego",
        color:"rojo",
        ingreso:"00",
        egreso: "00",
      },
      {
        id: 3,
        patente: "UV 349 LH",
        marca:"Fiat",
        modelo:"128",
        color:"gris",
        ingreso:"00",
        egreso: "00"
      }

    ];
    return { xp };
  }
}

