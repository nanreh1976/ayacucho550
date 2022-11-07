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
          idCliente:1,
          tarifa: {
            id: 7,
            nombre: "auto-mes",               // nombre de la tarifa 
            categoria: "auto",            // tipo de vehiculo
            fraccion: 1,             // fraccion minima de facturacion
            unidad_tiempo: "mes",        // minutos, horas, dias, semanas, mes
            valor: 8500,                
            tolerancia: 0,           // rango de tolerancia
          },
          estado:1,          
          // ingreso: "00",
          // egreso: "00"
        },
        {
          id: 2,
          patente: "AX512LH",
          marca: "Renault",
          modelo: "Fuego",
          color: "rojo",
          idCliente:2,
          tarifa: {
            id: 7,
            nombre: "auto-mes",               // nombre de la tarifa 
            categoria: "auto",            // tipo de vehiculo
            fraccion: 1,             // fraccion minima de facturacion
            unidad_tiempo: "mes",        // minutos, horas, dias, semanas, mes
            valor: 8500,                
            tolerancia: 0,           // rango de tolerancia
          },
          estado:0,
          // ingreso: "00",
          // egreso: "00",
        },
        {
          id: 3,
          patente: "UV349LH",
          marca: "Fiat",
          modelo: "128",
          color: "gris",
          idCliente:2,
          tarifa: {
            id: 7,
            nombre: "auto-mes",               // nombre de la tarifa 
            categoria: "auto",            // tipo de vehiculo
            fraccion: 1,             // fraccion minima de facturacion
            unidad_tiempo: "mes",        // minutos, horas, dias, semanas, mes
            valor: 8500,                
            tolerancia: 0,           // rango de tolerancia
          },
          estado:1,
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
        {
          id: 7,
          nombre: "auto-mes",               // nombre de la tarifa 
          categoria: "auto",            // tipo de vehiculo
          fraccion: 1,             // fraccion minima de facturacion
          unidad_tiempo: "mes",        // minutos, horas, dias, semanas, mes
          valor: 8500,                
          tolerancia: 0,           // rango de tolerancia
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
          email: "a@a.com"
        },

        {
          id: 2,
          apellido:"Thompson",
          nombre: "Homero ",
          telefono: "4444-5335",
          direccion: "siempreviva 4534",
          comentario: "homero movil patente 2343323434",
          email:"b@b.com"         
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
          saldo: 0,
          codigoBarras: "fht231-15:17:23"
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
          saldo: 0,
          codigoBarras: "ad123sa-14:24:23"
        },
      ], 

      facturacion: [
        {
          id: 3,
          patente: "AA123ZZ",
          fechas: {
            fechaDate: "Tue Oct 25 2022 17:09:31 GMT-0300 (hora estándar de Argentina)",
            fechaIngreso: "25-10-2022",
            horaIngreso: "14:24:23",
            fechaSalidaDate: "",
            fechaSalida: "xx-xx-xxxx",
            horaSalida: "yy:yy:yy",   
            estadia: 100,         
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
          saldo: 1000,
          codigoBarras: "AA123ZZ-25-10-2022-14:24:23"
        },

        {
          id: 4,
          patente: "XX234XX",
          fechas: {
            fechaDate: "Tue Oct 25 2022 17:09:31 GMT-0300 (hora estándar de Argentina)",
            fechaIngreso: "25-10-2022",
            horaIngreso: "14:24:23",
            fechaSalidaDate: "",
            fechaSalida: "cc-cc-cccc",
            horaSalida: "zz-zz-zzzz",   
            estadia: 100,         
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
          saldo: 1000,
          codigoBarras: "XX234XX-25-10-2022-14:24:23"
        },
      ],  

    };


  }

}