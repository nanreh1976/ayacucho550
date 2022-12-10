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

@Component({
  selector: 'app-caja-control',

  template: `
  <app-caja-view


  [data]=data 
  [saldo]=saldo  
  [usuario]=usuario 
 (newItemEvent)="getMsg($event)"


  ></app-caja-view>
  
              `,



  styleUrls: ['./caja-control.component.scss']
})
export class CajaControlComponent implements OnInit {

  componente: string = 'caja'
  usuario!: string


  // data recibida del crud
  data!: Icaja[];

  saldo: number = 0

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private dbFirebase: DbFirestoreService,
    // private logger: LogService
  ) {
  }

  ngOnInit(): void {
    this.getAll2();
    this.setUser();
    console.log("caja", this.data)

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
      if (item.operacion === "ingreso") {
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

  // CRUD

  getAll(): void {
    this.dbFirebase.getAll(this.componente).subscribe(data => {
      this.data = data;
      localStorage.setItem(`${this.componente}`, JSON.stringify(data))
      //console.log(JSON.stringify(this.data))
      this.calcularSaldo(this.data)
    })
  }

  getAll2():void {
    // llamar a getAll del servicio firebase para tener la lista de registros de caja
    this.dbFirebase.getAll2(this.componente).subscribe(data => {
      // data toma el listado de registros de caja
      this.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as  Icaja;
      });
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

