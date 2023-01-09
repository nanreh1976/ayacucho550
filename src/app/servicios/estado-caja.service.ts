import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DbFirestoreService } from './database/db-firestore.service';
import { CajaStorageService } from './storage/caja-storage.service';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoCajaService {
  constructor(private dbFirebase: DbFirestoreService,
    private storageService:StorageService, 
    private cajaStorageService:CajaStorageService,
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
          // Si no hay caja abierta en firebase, cerrar caja en la app
          this.modoCaja$.next('cerrada');
        } else {
          // Si Hay caja abierta en firebase, determinar estado segun usuarios
          this.setModoCaja(cajaLog);
        }
      });
  }

  // metodos para modificar el estado de caja en la app

  // en base al estado y usuario de caja en firebase, establecer el estado en la app
  setModoCaja(cajaLog: any) {
    let cajaL = JSON.parse(cajaLog);
    let userCajaUid = cajaL.userUid;

    let user = JSON.parse(localStorage.getItem('usuario') || `{}`);
    let userLoggedUid = user['uid'];
    let userLoggeEsAdmin = !user.roles.user;

    // si la caja esta abierta en firebase por el mismo usuario en la app
    // abre caja
    // TODO CARGAR LOS DATOS DE LA SESION

    if (userCajaUid === userLoggedUid) {
      this.modoCaja$.next('abierta');
      //this.cargarsesiondesdecajaLogenfirebase
    }

    // si el usuario no coincide con el que abrio la sesion de caja:
    else if (
      // si es admin le avisa y le muestra el boton cerrar
      userLoggeEsAdmin
    ) {
      this.modoCaja$.next('admin');
      this.sesionCaja$.next(cajaL); // cambia estado observer para componentes
      this.sesionCaja = cajaL; // info de sesion caja para uso interno (abrir y cerrar)
      console.log('admin estado caja', cajaL, cajaLog); // pasa info de la sesion abierta al admin
    } else {
      // si es user le avisa que ya esta abierta y que llame al admin si necesita.

      this.modoCaja$.next('block');
    }
  }

  // metodos para abrir y cerra caja en la BBDD (cajaLog)

  cerrarSesion() {
    let nd = new Date()
    this.sesionCaja.estado="cerrada"
    this.sesionCaja.cierre=nd

    this.storageService.updateItem("cajaLog", this.sesionCaja)

    // tiene que cerrar la sesion de caja actual
    // tiene que pasar el modo de caja a cerrada
    //  this.estadoCaja = 'cerrada';
  }

  abrirSesion(item:any) {
    // Abre la sesion en el cajaLog
    let nd = new Date()
    let user = JSON.parse(localStorage.getItem('usuario') || `{}`);
    let userLoggedUid = user['uid'];
    let userDisplayName = user["displayName"]
    let nuevaSesionCaja = {
      "apertura": nd, 
      "estado" : "abierta",
      "userDisplayname" : userDisplayName ,
      "userUid" : userLoggedUid  ,
       }
    this.storageService.addItem("cajaLog", nuevaSesionCaja)

    // carga la primer operacion (saldo inical de caja)
    this.cajaStorageService.addItem("caja" , item);

  }
}
