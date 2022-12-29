import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DbFirestoreService } from './database/db-firestore.service';
import { tap, map } from 'rxjs/operators';
import { CajaStoreService } from 'src/app/caja/caja-store.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  // los componentes trabajan solo con el storage
  // el storage hace las operaciones crud solo cuando hagan falta 
  // los observables mantienen la info sincronizada entre comp y storage.


  constructor(private dbFirebase: DbFirestoreService,
    private store: CajaStoreService,
  
    
    
    ) { }

  // Observables //

  private _playa$ = new BehaviorSubject<any>(null)   //aca va interface my data
  public playa$ = this._playa$.asObservable()

  private _tarifas$ = new BehaviorSubject<any>(null)   //aca va interface my data
  public tarifas$ = this._tarifas$.asObservable()

  private _usuario$ = new BehaviorSubject<any>(null)   //aca va interface my data
  public usuario$ = this._usuario$.asObservable()

  private _vehiculos$ = new BehaviorSubject<any>(null)   //aca va interface my data
  public vehiculos$ = this._vehiculos$.asObservable()

  private _clientes$ = new BehaviorSubject<any>(null)   //aca va interface my data
  public clientes$ = this._clientes$.asObservable()



  updateObservable(componente: any, data: any){
    switch(componente) { 
      case "playa": { 
        this._playa$.next(data)
         break; 
      } 
      case "tarifas": { 
        this._tarifas$.next(data)
         break; 
      } 
      case "usuario": { 
        this._usuario$.next(data)
         break; 
      } 

      case "vehiculos": { 
        this._vehiculos$.next(data)
         break; 
      } 

      case "clientes": { 
        this._clientes$.next(data)
         break; 
      } 
      default: { 
         //statements; 
         break; 
      } 
   } 

  }





  // metodos del storage
  
  setInfo(componente: any, data: any) {    // interface mydata en vez de any
    const jsonData = JSON.stringify(data)
    localStorage.setItem(`${componente}`, JSON.stringify(data))
    this.updateObservable(componente, data)
  }

  loadInfo(componente: any) {
    const data = JSON.parse(localStorage.getItem(componente) || "")
    this.updateObservable(componente, data)
  }

  clearInfo(componente:any) {
    localStorage.removeItem('myData')
    this.updateObservable(componente, null)
  }

  clearAllLocalStorage() {
    localStorage.clear()
    this._playa$.next(null)
  }


////   INITIALIZER     ////////

// Al inicio de la aplicacion se carga el storage con los datos de la base
// al estar suscripto, cualquier cambio en la base se refleja en el storage.

initializer() {

  this.getAllSorted("playa", 'fechas.fechaDate', 'asc')
  this.getAllSorted("tarifas", 'categoria', 'asc')
  this.getAllSorted("vehiculos", 'patente', 'asc')
  this.getAllSorted("clientes", 'apellido', 'asc')

  this.getCaja();
  // console.log("initializer getting todo")
}

getCaja() { // pasar campo y orden (asc o desc)
  this.dbFirebase
    .getAllSorted2('caja', 'fecha', 'desc')
    .pipe(
      tap(data => {
        console.log("initializer get caja", data)
        this.store.patch({
          loading: false,
          data,

        }

        )
      })
    )
    .subscribe();
}





// METODOS CRUD

  getAllSorted(componente: any, campo:any, orden:any) {

    // pasar campo y orden (asc o desc)
    this.dbFirebase.getAllSorted2(componente, campo, orden)
      .subscribe(data => {
  
        this.setInfo(componente, data)
        this.updateObservable(componente, data)
        console.log("storage initializer ", componente, data)


      });

  }



  addItem(componente: string, item: any): void {

    item.fechaOp = new Date()
    console.log(" storage add item ", componente, item,)


    this.dbFirebase.create(componente, item)
      // .then((data) => console.log(data))
      // .then(() => this.ngOnInit())
      .catch((e) => console.log(e.message));
  }


  
  deleteItem(componente: string, item: any): void {

    console.log(" storage delete item ", componente, item,)

    this.dbFirebase.delete(componente, item.id)
      // .then((data) => console.log(data))
      // .then(() => this.ngOnInit())
      // .then(() => console.log("pasa por delete metodo?"))
      .catch((e) => console.log(e.message));

  }

    updateItem(componente: string, item: any): void {
      console.log(" storage update item ", componente, item,)

    this.dbFirebase.update(componente, item)
      // .then((data) => console.log(data))
      // .then(() => this.ngOnInit())
      .catch((e) => console.log(e.message));

  }


}