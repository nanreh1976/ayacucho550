import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DbFirestoreService } from './database/db-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  private _playa$ = new BehaviorSubject<any>(null)   //aca va interface my data
  public playa$ = this._playa$.asObservable()

  private _tarifas$ = new BehaviorSubject<any>(null)   //aca va interface my data
  public tarifas$ = this._tarifas$.asObservable()

  private _usuario$ = new BehaviorSubject<any>(null)   //aca va interface my data
  public usuario$ = this._usuario$.asObservable()


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
      default: { 
         //statements; 
         break; 
      } 
   } 

  }

  constructor(private dbFirebase: DbFirestoreService) { }


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

  initializerSorted(componente: any, campo:any, orden:any) {

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