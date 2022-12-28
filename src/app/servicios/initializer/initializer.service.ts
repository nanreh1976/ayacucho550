import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { CajaStoreService } from 'src/app/caja/caja-store.service';
import { CajaService } from 'src/app/caja/caja.service';
import { AbonoService } from '../abono/abono.service';
import { DbFirestoreService } from '../database/db-firestore.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {

  

  clientes!:any;
  vehiculos!:any;
  tarifas!:any;
  playa!:any

  constructor(private dbFirebase: DbFirestoreService,
    private store: CajaStoreService,

    private abonoService: AbonoService,

    private storage: StorageService

    ) { }

  getTodo(){
    
    this.storage.initializerSorted("playa", 'fechas.fechaDate', 'asc')
    this.storage.initializerSorted("tarifas", 'categoria', 'asc')
    this.getClientes();
    this.getVehiculos();
    this.getCaja();
    console.log("initializer getting todo")
    // this.cajaService.restart();
    this.verificarAbonos();
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



  verificarAbonos(){
    this.abonoService.verificarAbonos()     //se llama al servicio para comprobar el vencimiento de los abonos.
  }

}
