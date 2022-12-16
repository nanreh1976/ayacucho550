import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DbFirestoreService } from './database/db-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoCajaService {


  constructor(private dbFirebase: DbFirestoreService) {

    //aca deberia determinar el esatdo de la caja inicial
  }

  estadoCaja$ = new BehaviorSubject<string>('');

  cerrar() {
    this.estadoCaja$.next('cerrada');
  }

  abrir() {
    this.estadoCaja$.next('abierta');
  }

  admin() {
    this.estadoCaja$.next('admin');
  }

  bloquear() {
    this.estadoCaja$.next('block');
  }

  setEstadoCaja() {
    this.abrir()
    // si el usuario no coincide con el que abrio la sesion de caja:
    // si es user la bloquea y que llame al admin

    //this.modo="blocked"

    // si es admin le avisa y le muestra el boton cerrar

    //this.modo="admin"

    // Si la caja esta cerrada, Avisa y muestra la opcion de abrir caja

    //this.modo="cerrada"

    // si la caja esta abierta y el usuario de la sesion es el mismo de la app
    // procede normalmente

    // this.estadoCaja = 'abierta';
    

  }


  estadoCaja() {
    return this.estadoCaja$.asObservable();
  }


}
