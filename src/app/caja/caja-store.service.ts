import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaStoreService {

  //protected store: string = 'caja';
  protected bs: BehaviorSubject<any>;
  state$: Observable<any>;
  state: any;

  protected store: string;
  initialValue =
    {
      loading: true,
      data: [],
      saldo: 0
    }

  constructor() {
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
}