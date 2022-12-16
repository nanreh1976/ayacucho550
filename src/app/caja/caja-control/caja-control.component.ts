import { Component, OnInit, ɵcompileNgModuleFactory } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { Icaja } from 'src/app/interfaces/Icaja'
import { LogService } from 'src/app/servicios/log.service';

import { CajaCierreFormComponent } from '../forms/caja-cierre-form/caja-cierre-form.component';
import { CajaEgresoFormComponent } from '../forms/caja-egreso-form/caja-egreso-form.component';

import { CajaIngresoFormComponent } from '../forms/caja-ingreso-form/caja-ingreso-form.component';
import { CajaAperturaFormComponent } from '../forms/caja-apertura-form/caja-apertura-form.component';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-caja-control',

  template: `

<div class="container">


<div *ngIf="modo==='block'">

La caja esta abierta por otro usuario.#
Consulte a su admin

</div>

<div *ngIf="modo==='admin'">

La caja esta abierta por el usuario 
desde, desea cerrarla?
boton cerrar caja


</div>


<div *ngIf="modo==='cerrada'">

La caja esta cerrada.
Puede abirla para empezar a operar.#
boton abrir


</div>


<div *ngIf="modo==='abierta'">
  <app-caja-view
  [data]=data 
  [saldo]=saldo  
  [usuario]=usuario 
  [cajaLog]=cajaLog
 (newItemEvent)="getMsg($event)"
  ></app-caja-view>
  
</div>

</div>
`,



  styleUrls: ['./caja-control.component.scss']
})
export class CajaControlComponent implements OnInit {

  componente: string = 'caja'
  usuario!: string


  // data recibida del crud
  data!: Icaja[];

  saldo: number = 0
  cajaLog:any
  modo:string=""

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private dbFirebase: DbFirestoreService,
    // private logger: LogService
  ) {
  }

  ngOnInit(): void {
    this.getAllSorted();
    this.setUser();
    this.getCajaLog()
    this.chequearEstado()
  
  }

chequearEstado(){
  // si el usuario no coincide con el que abrio la sesion de caja:
     // si es user la bloquea y que llame al admin
     
     //this.modo="blocked"

     // si es admin le avisa y le muestra el boton cerrar

      //this.modo="admin"


  // Si la caja esta cerrada, Avisa y muestra la opcion de abrir caja
 
      //this.modo="cerrada"

  // si la caja esta abierta y el usuario de la sesion es el mismo de la app
  // procede normalmente

      this.modo="abierta"

  return
}
  aperturaCaja() {
    // console.log("apertura de caja")
    // this.logger.log("apertura de caja", "");
  }


  cierreCaja() {
    console.log("cierre de caja")
    //  this.logger.log("Cierre de caja", "");
  }

  // Do stuff in case forEach has not returned
  calcularSaldo(data: any) {
    this.saldo = 0
    for (let item of data) {
      if (item.operacion === "ingreso" || item.operacion === "apertura" ) {
        this.saldo += Number(item.importe)
      } else {
        this.saldo -= Number(item.importe)
      }
    }

  }

  getMsg(msg: any) {
    // console.log(msg, "from parent");
    this.openForm(msg.op, msg.item)
  }

  selectForm(modo: string) {

    switch (modo) {
      case 'Cierre de Caja': {
        return CajaCierreFormComponent
        break;
      }
      case 'Apertura de Caja': {
        return CajaAperturaFormComponent
        break;
      }

      case 'Egreso': {
        return CajaEgresoFormComponent
        break;
      }

      case 'Ingreso': {
        return CajaIngresoFormComponent
        break;
      }
      default: {
        return "no hay operacion con ese nombre"
        break;
      }
    }
  }

  openForm(modo: string, item: any) {
    let selectedForm = this.selectForm(modo)
    const modalRef = this.modalService.open(selectedForm,
      {
        windowClass: 'myCustomModalClass',
        centered: true,
        size: 'lg',
      })

    let info = {
      modo: modo,
      item: item,
      saldo: this.saldo,
    }


    modalRef.componentInstance.fromParent = info;
    modalRef.result.then((result) => {
      this.selectCrudOp(result.op, result.item)
        ;
    }, (reason) => { });
  }


  setUser() {
    let user = JSON.parse(localStorage.getItem("user") || `{}`)
    this.usuario = (user['displayName'])
  }


  // seleccionar operacion CRUD

  selectCrudOp(op: string, item: any) {

    switch (op) {
      case 'Ingreso': {
        item.operacion = "ingreso"
        this.addItem(this.componente, item);
        break;
      }

      case 'Egreso': {
        item.operacion = "egreso"
        this.addItem(this.componente, item);
        break;
      }

      case 'Cierre de Caja': {
        this.cierreCaja()
        item.operacion = "cierre"
        this.addItem(this.componente, item);
        break;
      }

      case 'Apertura de Caja': {
        this.aperturaCaja()
        item.operacion = "apertura"
        this.addItem(this.componente, item);
        break;
      }


      default: {
        console.log("sin operacion en case crud")
        break;
      }
    }
  };


// CAJALOG

// Cada sesion de caja tiene un id unico, y queda registrado en la coleccion CAJALOG
// En el caja log se registra apertura, cierre, estado (abierto o cerrado ) usuario .
// Solo puede haber una sesion abierta a la vez (porque hay una sola caja)

  
getCajaLog(){
  this.dbFirebase.getByFieldValue  ('cajaLog', 'estado', 'abierto').subscribe(ref => {
    console.log ("caja abierta", JSON.stringify(ref)  )
    this.cajaLog = ref[0]

  }) 
}




// CRUD



  getAll(): void {
    this.dbFirebase.getAll(this.componente).subscribe(data => {
      this.data = data;
      localStorage.setItem(`${this.componente}`, JSON.stringify(data))
      //console.log(JSON.stringify(this.data))
      this.calcularSaldo(this.data)
    })
  }


  // // GET ALL ACTUALIZADO PARA LEER EL PAYLOAD
  // getAll2(): void {
  //   // llamar a getAll del servicio firebase para tener la lista de registros de caja
  //   this.dbFirebase.getAll2(this.componente).subscribe(data => {
  //     // data toma el listado de registros de caja
  //     this.data = data.map(e => {
  //       return {
  //         id: e.payload.doc.id,
  //         ...e.payload.doc.data() as {}
  //       } as unknown as Icaja;
  //     });
  //     localStorage.setItem(`${this.componente}`, JSON.stringify(data))
  //     //console.log(JSON.stringify(this.data))
  //     this.calcularSaldo(this.data)
  //   });

  // }

  getAllSorted() {
    // pasar campo y orden (asc o desc)
    this.dbFirebase.getAllSorted(this.componente, 'fecha', 'desc').subscribe(data => {
      this.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as Icaja;
      });

      // guardar en el local storage
      localStorage.setItem(`${this.componente}`, JSON.stringify(data))

      // calcular el saldo en cada actualizacion
      this.calcularSaldo(this.data)
    });

  }


  // deleteItem(componente: string, item: any): void {

  //   console.log("delete itemcomponent", item,)

  //   this.dbFirebase.delete(componente, item.id)
  //     .then((data) => console.log(data))
  //     .then(() => this.ngOnInit())
  //     .then(() => console.log("pasa por delete metodo?"))
  //     .catch((e) => console.log(e.message));

  // }

  addItem(componente: string, item: any): void {

    console.log("add itemcomponent", item,)

    this.dbFirebase.create(componente, item)
      .then((data) => console.log(data))
      .then(() => this.ngOnInit())
      .catch((e) => console.log(e.message));



  }


  // updateItem(componente: string, item: any): void {
  //   console.log("update itemcomponent", item,)

  //   this.dbFirebase.update(componente, item)
  //     .then((data) => console.log(data))
  //     .then(() => this.ngOnInit())
  //     .catch((e) => console.log(e.message));

  // }

}

