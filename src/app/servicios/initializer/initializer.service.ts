import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { CajaStoreService } from 'src/app/caja/caja-store.service';
import { CajaService } from 'src/app/caja/caja.service';
import { DbFirestoreService } from '../database/db-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {

  clientes!:any;
  vehiculos!:any;
  tarifas!:any;
  playa!:any

  constructor(private dbFirebase: DbFirestoreService,
    private store: CajaStoreService
    ) { }

  getTodo(){

    this.getClientes();
    this.getVehiculos();
    this.getTarifas();
    this.getPlaya();
    this.getCaja();
    console.log("initializer getting todo")
    // this.cajaService.restart();

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
  
            // saldo: this.calcularSaldo(data)
          }
   
         )
        })
      )
      .subscribe();
  }

  getClientes(){
    this.dbFirebase.getAll("clientes").subscribe(data => {
      this.clientes = data;
      localStorage.setItem(`${"clientes"}`, JSON.stringify(this.clientes))
      //console.log(this.clientes);      
    })
  }

  getVehiculos(){
    this.dbFirebase.getAll("vehiculos").subscribe(data => {
      this.vehiculos = data;
      localStorage.setItem(`${"vehiculos"}`, JSON.stringify(this.vehiculos))
      //console.log(this.vehiculos);      
    })
  }

  getTarifas(){
    this.dbFirebase.getAll("tarifas").subscribe(data => {
      this.tarifas = data;
      localStorage.setItem(`${"tarifas"}`, JSON.stringify(this.tarifas))
      //console.log(this.tarifas);      
    })
  }

  getPlaya(): void {
    this.dbFirebase.getAll("playa").subscribe(data => {
      this.playa = data;
      localStorage.setItem(`${"playa"}`, JSON.stringify(data))
      console.log(this.playa);      
    })
  }

}
