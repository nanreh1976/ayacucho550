import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbFirestoreService } from '../database/db-firestore.service';
import { AbonoService } from '../abono/abono.service';



@Injectable({
  providedIn: 'root'
})
export class VehiculosStorageService {
componente:string ="vehiculos"
   data: any
  protected bs: BehaviorSubject<any>;
  state$: Observable<any>;
  state: any;

  protected store: string;
  initialValue =
    {
      loading: true,
      data: [],
 
    }

  constructor(
    private firestore: DbFirestoreService,
    private abonoService: AbonoService
  ) {
    this.bs = new BehaviorSubject<any>(this.initialValue as any);
    this.state$ = this.bs.asObservable();
    this.state = this.initialValue;
    this.state$.subscribe(s => {
      this.state = s
    })
  }

  // el .assign toma lo viejo, corregido con lo nuevo, es decir, aplica las modificaciones
  patch(newValue: any) {
    const newState = Object.assign({}, this.state, newValue);
    this.bs.next(newState)
  }

  // reset() {
  //   this.bs.next(this.initialValue)
  // }




  getAllSorted() { // pasar campo y orden (asc o desc)
    this.firestore
      .getAllSorted(this.componente, 'patente', 'asc')
      .pipe(
        tap(data => {
          this.patch({
            loading: false,
            data,
            saldo: this.abonoService.verificarAbonos(data)
          })
          // localStorage.setItem(`${this.componente}`, JSON.stringify(data))
        })

      )
      .subscribe();
  }



  // restart() {
  //   this.store.reset()
  //   this.getAllSorted2()
  // }

  get data$(): Observable<any> {
    return this.state$.pipe(map(state => state.loading ? [] : state.data))
  }

  get loading$(): Observable<boolean> {
    return this.state$.pipe(map(state => state.loading))
  }

  get noResults$(): Observable<boolean> {
    return this.state$.pipe(
      map(state => {
        return !state.loading && state.data && state.data.length === 0
      })
    )
  }


}