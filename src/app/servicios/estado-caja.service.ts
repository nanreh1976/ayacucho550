import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DbFirestoreService } from './database/db-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoCajaService {
  constructor(private dbFirebase: DbFirestoreService) {
    this.getEstadoCajaFirebase();
    // determinar estado de caja en firebase antes de iniciar la app
  }

  modoCaja$ = new BehaviorSubject<string>('');
  sesionCaja$ = new BehaviorSubject<any>('');

  // metodo para consultar el observer por otros componentes
  getModoCaja() {
    return this.modoCaja$.asObservable();
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
      this.sesionCaja$.next(cajaL); // pasa info de la sesion abierta al admin
    } else {
      // si es user la bloquea y que llame al admin

      this.modoCaja$.next('block');
    }
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
}
