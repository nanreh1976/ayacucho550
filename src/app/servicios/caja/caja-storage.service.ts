import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbFirestoreService } from '../database/db-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class CajaStorageService {
  componente: string = 'caja';
  data: any;
  sesionId: string;

  protected bs: BehaviorSubject<any>;
  state$: Observable<any>;
  state: any;

  protected store: string;
  initialValue = {
    loading: true,
    data: [],
    saldo: 0,
  };

  constructor(private firestore: DbFirestoreService) {
    this.bs = new BehaviorSubject<any>(this.initialValue as any);
    this.state$ = this.bs.asObservable();
    this.state = this.initialValue;
    this.state$.subscribe((s) => {
      this.state = s;
    });
  }

  // el .assign toma lo viejo, corregido con lo nuevo, es decir, aplica las modificaciones
  patch(newValue: any) {
    const newState = Object.assign({}, this.state, newValue);
    this.bs.next(newState);
  }

  // reset() {
  //   this.bs.next(this.initialValue)
  // }

  addItem(componente: string, item: any, sesionId?: string): void {

    item.fechaOp = new Date();
    if (typeof sesionId !== 'undefined') {
      item.sesionId = sesionId;
    } else {
      item.sesionId = this.sesionId;
    }

    console.log(' storage add item ', componente, item);
    this.addToFirestore(componente, item);
  }


  addToFirestore(componente: string, item: any): void {
    this.firestore
      .create(componente, item)
      // .then((data) => console.log(data))
      .catch((e) => console.log(e.message));
  }

  getSesionOps(sesionId: string) {
    this.sesionId = sesionId
    this.firestore
      .getByFieldValue(this.componente, 'sesionId', sesionId)
      .pipe(
        tap((data) => {
          this.patch({
            loading: false,
            data,
            saldo: this.calcularSaldo(data),
          });
        })
      )
      .subscribe();
  }

  calcularSaldo(data: any) {
    // console.log('calcular saldo ', data);
    let saldo = 0;
    for (let item of data) {
      if (item.operacion === 'ingreso' || item.operacion === 'apertura') {
        saldo += Number(item.importe);
      } else {
        saldo -= Number(item.importe);
      }
      // console.log(saldo)
    }
    return saldo;
  }

  // restart() {
  //   this.store.reset()
  //   this.getAllSorted2()
  // }

  get data$(): Observable<any> {
    return this.state$.pipe(map((state) => (state.loading ? [] : state.data)));
  }

  get loading$(): Observable<boolean> {
    return this.state$.pipe(map((state) => state.loading));
  }

  get noResults$(): Observable<boolean> {
    return this.state$.pipe(
      map((state) => {
        return !state.loading && state.data && state.data.length === 0;
      })
    );
  }

  get saldo$(): Observable<number> {
    return this.state$.pipe(map((state) => state.saldo));
  }
}
