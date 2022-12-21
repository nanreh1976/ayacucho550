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
    //  getAllSorted() {  pasar campo y orden (asc o desc)
    this.firestore
      .getAllSorted2(this.componente, 'fecha', 'desc')
      .pipe(
        tap(data => {
          this.store.patch({
            loading: false,
            data,
          })
        })
      )
      .subscribe();
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

}