import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { CajaStorageService } from './caja-storage.service';
import { DbFirestoreService } from '../database/db-firestore.service';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoCajaService {
  constructor(
    private dbFirebase: DbFirestoreService,
    private storageService: StorageService,
    private cajaStorageService: CajaStorageService,
    private angularFirestore: AngularFirestore
  ) {
    this.getEstadoCajaFirebase();
    // determinar estado de caja en firebase antes de iniciar la app
  }

  modoCaja$ = new BehaviorSubject<string>('');
  sesionCaja$ = new BehaviorSubject<any>('');
  sesionCaja: any = '';
  // metodo para consultar el observer por otros componentes
  getModoCaja() {
    return this.modoCaja$.asObservable();
  }

  // metodo para consultar el estado de caja en firebase
  getEstadoCajaFirebase() {
    // si hay una caja abierta en el cajalog la devuelve
    this.dbFirebase
      .getByFieldValue('cajaLog', 'estado', 'abierta')
      .subscribe((ref) => {
        let cajaLog = JSON.stringify(ref[0]);
        if (cajaLog === undefined) {
          // Si no hay caja abierta en firebase, en la app cerrar caja y limpiar sesion
          this.modoCaja$.next('cerrada');
          this.sesionCaja$.next('');
        } else {
          // Si Hay caja abierta en firebase, determinar estado segun usuarios
          this.setModoCaja(cajaLog);
          this.sesionCaja = JSON.parse(cajaLog); //uso interno del servicio
        }
      });
  }

  // metodos para modificar el estado de caja en la app

  // en base al estado y usuario de caja en firebase, establecer el estado en la app
  setModoCaja(cajaLog: any) {
    // cual es el usuario logueado en la caja (firebase)
    let cajaL = JSON.parse(cajaLog);
    let userCajaUid = cajaL.userUid;

    // cual es el usuario logueado en la app
    let user = JSON.parse(localStorage.getItem('usuario') || `{}`);
    let userLoggedUid = user['uid'];
    let userLoggedEsAdmin = !user.roles.user;

    // si la caja esta abierta en firebase por el mismo usuario en la app
    // abre la caja en la app con la misma sesion de Caja de firebase
    if (userCajaUid === userLoggedUid) {
      this.modoCaja$.next('abierta');
      this.sesionCaja$.next(cajaL);
      this.cajaStorageService.getSesionOps(cajaL.id);
    }

    // si el usuario no coincide con el que abrio la sesion de caja:
    else if (
      // si es admin le avisa y le muestra el boton cerrar
      userLoggedEsAdmin
    ) {
      this.modoCaja$.next('admin');
      this.sesionCaja$.next(cajaL); // cambia estado observer para componentes

      // pasa info de la sesion abierta al admin
    } else {
      // si es user le avisa que ya esta abierta por otro usuario
      // y que llame al admin si necesita solucionar algo
      this.modoCaja$.next('block');
    }
  }

  // metodos para abrir y cerrar sesion caja en la BBDD (cajaLog)

  cerrarSesion() {
    // cierra sesion de Caja (cajaLOg) vigente
    // pasa el modo de caja a cerrado

    let nd = new Date();
    this.sesionCaja.estado = 'cerrada';
    this.sesionCaja.cierre = nd;

    this.storageService.updateItem('cajaLog', this.sesionCaja);
  }

  abrirSesion(item: any) {
    // arma los datos de la nueva sesion y Abre la sesion en el cajaLog
    let nd = new Date();
    let user = JSON.parse(localStorage.getItem('usuario') || `{}`);
    let userLoggedUid = user['uid'];
    let userDisplayName = user['displayName'];

    let nuevaSesionCaja = {
      apertura: nd,
      estado: 'abierta',
      userDisplayname: userDisplayName,
      userUid: userLoggedUid,
    };

    // esto es un injerto, deberia ir en el servicio database
    // es para conocer la id de la nueva sesion al momento de crearla
    // y poder cargarla en la operacion de caja "apertura" sin errores

    // #!!! Pasarlo.

    let dataCollection = `/${this.dbFirebase.coleccion}/datos/${'cajaLog'}`;
    let nuevaSesionId = this.angularFirestore.createId();

    this.angularFirestore
      .collection<any>(dataCollection)
      .doc(nuevaSesionId)
      .set(nuevaSesionCaja);
    // this.storageService.addItem("cajaLog", nuevaSesionCaja)
    console.log('nueva sesion caja', nuevaSesionCaja);

    // carga la primer operacion de la caja en la sesion
    // (saldo inical de caja)
    // con la id de sesion que se creo recien
    item.sesionId = nuevaSesionId;
    this.cajaStorageService.getSesionOps(nuevaSesionId);
    this.cajaStorageService.addItem('caja', item);
  
  }
}
