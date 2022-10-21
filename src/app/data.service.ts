import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})

// Base de datos "en el server"
export class DataService implements InMemoryDbService {
  createDb() {
    return {
      vehiculos: [
        {
          id: 1,
          patente: "AG759LH",
          marca: "Ford",
          modelo: "Sierra",
          color: "blanco",
          // ingreso: "00",
          // egreso: "00"
        },
        {
          id: 2,
          patente: "AX512LH",
          marca: "Renault",
          modelo: "Fuego",
          color: "rojo",
          // ingreso: "00",
          // egreso: "00",
        },
        {
          id: 3,
          patente: "UV349LH",
          marca: "Fiat",
          modelo: "128",
          color: "gris",
          // ingreso: "00",
          // egreso: "00"
        },
      ],

      tarifas: [
        {
          id: 1,
          nombre: "auto",
          unidad_tiempo: "hora",
          valor: 250,
          fraccion: "15",
          ut_fraccion: "minutos",
          descuento: "no"
        },
        {
          id: 2,
          nombre: "mensual",
          unidad_tiempo: "mes",
          valor: 7000,
          fraccion: "no",
          ut_fraccion: "no",
          descuento: "no"
        },
        {
          id: 3,
          nombre: "moto-estadia",
          unidad_tiempo: "dia",
          valor: 1500,
          fraccion: "no",
          ut_fraccion: "no",
          descuento: "no"
        },
      ],


      clientes: [
        {
          id: 1,
          apellido:"Lafea",
          nombre: "Jorgelina",
          telefono: "4444-5555",
          direccion: "alameda 2345",
          comentario: "polo rojo patente 2343323434",

        },

        {
          id: 2,
          apellido:"Thompson",
          nombre: "Homero ",
          telefono: "4444-5335",
          direccion: "siempreviva 4534",
          comentario: "homero movil patente 2343323434",
        },
      ],

      playa: [
        {
          id: 1,
          patente: "fht231",
          fechas: {
            fechaDate: "",
            fechaIngreso: "21-10-2022",
            horaIngreso: "15:17:23",
          },
          tarifa: "camion",
          descripcion: "Scania 1114",
        },

        {
          id: 2,
          patente: "ad123sa",
          fechas: {
            fechaDate: "",
            fechaIngreso: "21-10-2022",
            horaIngreso: "14:24:23",            
          },
          tarifa: "auto",
          descripcion: "fitito rojo",
        },
      ], 

      playaLog: [
        {
          id:4,
          patente: "AA234CC",
          ingreso: 24042015,
          egreso: 24042099,
          idTarifa: 4,
          saldo: 10,
          descripcion:"servicio lavado Renault fuego azul (?)"
        },

        {
          id:4,
          patente: "AA234CC",
          ingreso: 24042015,
          egreso: 24042099,
          idTarifa: 4,
          saldo: 10,
          descripcion:"servicio lavado Renault fuego azul (?)"
        },
      ], 

 

    };








  }

}