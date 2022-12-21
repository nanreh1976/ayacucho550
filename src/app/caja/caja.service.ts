import { Injectable } from '@angular/core';
import { DbFirestoreService } from '../servicios/database/db-firestore.service';
import { CajaStoreService } from './caja-store.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CajaService {

  componente: string = 'caja';


  data: any
  constructor(
    private firestore: DbFirestoreService,
    private store: CajaStoreService
  ) {
    this.getAllSorted2()
  }



  getAllSorted2() { // pasar campo y orden (asc o desc)
    this.firestore
      .getAllSorted2(this.componente, 'fecha', 'desc')
      .pipe(
        tap(data => {
          this.store.patch({
            loading: false,
            data,
            saldo: this.calcularSaldo(data)
          })
        })
      )
      .subscribe();
  }

  calcularSaldo(data: any) {
    console.log("calcular saldo ", data)
    let saldo = 0;
    for (let item of data) {
      if (item.operacion === 'ingreso' || item.operacion === 'apertura') {
        saldo += Number(item.importe);
      } else {
        saldo -= Number(item.importe);
      }
      console.log(saldo)
    }
    return saldo
  }

  get data$(): Observable<any> {
    return this.store.state$.pipe(map(state => state.loading ? [] : state.data))
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.loading))
  }

  get noResults$(): Observable<boolean> {
    return this.store.state$.pipe(
      map(state => {
        return !state.loading && state.data && state.data.length === 0
      })
    )
  }

  get saldo$(): Observable<number> {
    return this.store.state$.pipe(map(state => state.saldo))
  }

}