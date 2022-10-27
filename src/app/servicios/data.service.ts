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

      tarifas: [{
        id: 3,
        nombre: "auto-basico",               // nombre de la tarifa 
        categoria: "auto",            // tipo de vehiculo
        fraccion: 30,             // fraccion minima de facturacion
        unidad_tiempo: "min",        // minutos, horas, dias, semanas, mes
        valor: 150,                
        tolerancia: 5,           // rango de tolerancia
      },
        {
          id: 4,
          nombre: "camioneta-basico",               // nombre de la tarifa 
          categoria: "camioneta",            // tipo de vehiculo
          fraccion: 30,             // fraccion minima de facturacion
          unidad_tiempo: "min",        // minutos, horas, dias, semanas, mes
          valor: 180,                
          tolerancia: 5,           // rango de tolerancia
        },
        
        {
          id: 2,
          nombre: "moto-basico",               // nombre de la tarifa 
          categoria: "moto",            // tipo de vehiculo
          fraccion: 30,             // fraccion minima de facturacion
          unidad_tiempo: "min",        // minutos, horas, dias, semanas, mes
          valor: 120,                
          tolerancia: 5,           // rango de tolerancia
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
            fechaDate: "Tue Oct 25 2022 15:09:31 GMT-0300 (hora estándar de Argentina)",
            fechaIngreso: "25-10-2022",
            horaIngreso: "15:17:23",
            fechaSalidaDate: "",
            fechaSalida: "",
            horaSalida: "",
            estadia: 0,
          },
          tarifa:{
            id: 4,
            nombre: "camioneta-basico",               // nombre de la tarifa 
            categoria: "camioneta",            // tipo de vehiculo
            fraccion: 30,             // fraccion minima de facturacion
            unidad_tiempo: "min",        // minutos, horas, dias, semanas, mes
            valor: 180,                
            tolerancia: 5,           // rango de tolerancia
          },
          descripcion: "Scania 1114",
        },

        {
          id: 2,
          patente: "ad123sa",
          fechas: {
            fechaDate: "Tue Oct 25 2022 17:09:31 GMT-0300 (hora estándar de Argentina)",
            fechaIngreso: "25-10-2022",
            horaIngreso: "14:24:23",
            fechaSalidaDate: "",
            fechaSalida: "",
            horaSalida: "",   
            estadia: 0,         
          },
          tarifa: {
            id: 3,
            nombre: "auto-basico",               // nombre de la tarifa 
            categoria: "auto",            // tipo de vehiculo
            fraccion: 30,             // fraccion minima de facturacion
            unidad_tiempo: "min",        // minutos, horas, dias, semanas, mes
            valor: 150,                
            tolerancia: 5,           // rango de tolerancia
          },
          descripcion: "fitito rojo",
        },
      ], 

      facturacion: [
        {
          id: 3,
          patente: "AA123ZZ",
          fechas: {
            fechaDate: "Fri Oct 25 2022 15:09:31 GMT-0300 (hora estándar de Argentina)",
            fechaIngreso: "21-10-2022",
            horaIngreso: "15:17:23",
            fechaSalidaDate: "",
            fechaSalida: "",
            horaSalida: "",
            estadia: 0,
          },
          tarifa: "avioneta",
          descripcion: "cessna 12343",
        },

        {
          id: 4,
          patente: "XX234XX",
          fechas: {
            fechaDate: "Fri Oct 21 2022 17:09:31 GMT-0300 (hora estándar de Argentina)",
            fechaIngreso: "21-10-2022",
            horaIngreso: "14:24:23",
            fechaSalidaDate: "",
            fechaSalida: "",
            horaSalida: "",   
            estadia: 0,         
          },
          tarifa: "lancha",
          descripcion: "cadillac 434",
        },
      ], 

    };


  }

}