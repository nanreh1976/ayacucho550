import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { LogService } from 'src/app/servicios/log.service';
import { CajaFormComponent } from '../caja-form/caja-form.component';

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


  // nombre del crud / componente
  componente: string = 'caja'
  // reactiveforms, modo edicion, delete etc
  //modo!: string;

  usuario!: string


  // data recibida del crud
  data!: any;
  saldo: number = 0


  setUser() {
    let user = JSON.parse(localStorage.getItem("user") || `{}`)
    this.usuario = (user['displayName'])
  }

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private dbFirebase: DbFirestoreService,
    private logger: LogService
  ) {
  }



  ngOnInit(): void {
    this.getAll();
    this.setUser()

  }

  aperturaCaja() {
    // console.log("apertura de caja")
    this.logger.log("apertura de caja", "");
  }


  cierreCaja() {
    // console.log("cierre de caja")
    this.logger.log("Cierre de caja", "");
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
      // console.log(item.importe)
      //console.log("saldo", this.saldo)
    }

  }



  getMsg(msg: any) {
    // console.log(msg, "from parent");
    this.openForm(msg.op, msg.item)
  }

  openForm(modo: string, item: any) {
    {
      const modalRef = this.modalService.open(CajaFormComponent,
        {
          // scrollable: false,
          windowClass: 'myCustomModalClass',
          // keyboard: false,
          // backdrop: 'static'
          centered: true,
          size: 'lg',
        })

      let info = {
        modo: modo,
        item: item

      }


      modalRef.componentInstance.fromParent = info;
      modalRef.result.then((result) => {
        // console.log("result from control", "op", result.op, "item", result.item);

        // this.getXps();  
        this.selectCrudOp(result.op, result.item)
          ;
      }, (reason) => { });
    }
  }

  agregarUsuario(item: any) {
    item.usuario = this.usuario
    console.log("usuario agregado", JSON.stringify(item))
  }

  // seleccionar operacion CRUD

  selectCrudOp(op: string, item: any) {
    this.agregarUsuario(item)
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

      case 'Cierre de caja': {
        this.cierreCaja()
        item.operacion = "cierre"
        //  this.addItem(this.componente, item);
        break;
      }

      case 'Apertura de Caja': {
        this.aperturaCaja()
        item.operacion = "apertura"
        // this.addItem(this.componente, item);
        break;
      }
      // case 'Editar': {
      //   this.updateItem(this.componente, item);
      //   break;
      // }
      // case 'Eliminar': {
      //   this.deleteItem(this.componente, item);
      //   break;
      // }

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

