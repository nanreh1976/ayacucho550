import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DbFirestoreService } from './database/db-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoCajaService {


  constructor(private dbFirebase: DbFirestoreService) {
  // this.getCajaAbierta()
    //aca deberia determinar el esatdo de la caja inicial
  }

  modoCaja$ = new BehaviorSubject<string>('');


  cerrar() {
    this.modoCaja$.next('cerrada');
  }

  abrir() {
    this.modoCaja$.next('abierta');
  }

  admin() {
    this.modoCaja$.next('admin');
  }

  bloquear() {
    this.modoCaja$.next('block');
  }

  setmodoCaja() {
    this.abrir()
    // si el usuario no coincide con el que abrio la sesion de caja:
    // si es user la bloquea y que llame al admin

    //this.modoCaja="blocked"

    // si es admin le avisa y le muestra el boton cerrar

    //this.modoCaja="admin"

    // Si la caja esta cerrada, Avisa y muestra la opcion de abrir caja

    //this.modoCaja="cerrada"

    // si la caja esta abierta y el usuario de la sesion es el mismo de la app
    // procede normalmente

    // this.modoCaja = 'abierta';
    

  }


  getModoCaja() {
    return this.modoCaja$.asObservable();
  }

  getCajaAbierta() {
    // si hay una caja abierta en el cajalog la devuelve
    this.dbFirebase
      .getByFieldValue('cajaLog', 'estado', 'abierta')
      .subscribe((ref) => {

        let cajaLog = JSON.stringify(ref[0]);
        if  (cajaLog === undefined) {
          console.log("servicio caja this.cerrar")
          this.cerrar()
        } else {
          console.log("servicio caja this.cerrar")
          this.abrir()
        }
      
      
        });
  }







}
