import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'  // servicios modal
import { PlayaI } from 'src/app/interfaces/playaI';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { InterOpService } from 'src/app/servicios/inter-op.service';
import { LogService } from 'src/app/servicios/log.service';


import { TicketEntradaComponent } from 'src/app/ticket-entrada/ticket-entrada.component';
import { PlayaFormComponent } from '../playa-form/playa-form.component';


@Component({
  selector: 'app-playa-control',
  template: `

<app-inicio class="d-flex justify-content-center mt-5"  
 (newItemEvent)="getMsg($event)"
></app-inicio>

<app-playa-view
  [data]=data  
 (newItemEvent)="getMsg($event)"
  ></app-playa-view>
  
  
              `,

  styleUrls: ['./playa-control.component.scss']
})
export class PlayaControlComponent implements OnInit {



  // nombre del crud / componente
  componente: string = 'playa'

  // data recibida del crud
  data!: any;

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private dbFirebase: DbFirestoreService,
    private interOpService: InterOpService,
    private logger: LogService,
  ) { }


  ngOnInit(): void {
    this.getAll();  //tomar datos de los vehiculos en playa
    //this.getuser();
  }


  getuser() {
    console.log(JSON.parse(localStorage.getItem('user') || `{}`))

  }

  /// RECIBE MENSAJE DE LA VISTA ///

  getMsg(msg: any) {
    // console.log(msg, "from parent");
    this.openForm(msg.op, msg.item)
  }


  /// MODAL DEL FORM SEGUN INFO DE LA VISTA ////


  openForm(modo: string, item: any) {
    {
      const modalRef = this.modalService.open(PlayaFormComponent,
        {
          // scrollable: false,
          windowClass: 'myCustomModalClass',
          // keyboard: false,
          // backdrop: 'static'
        })

      let info = {
        modo: modo,
        item: item

      }


      modalRef.componentInstance.fromParent = info;
      modalRef.result.then((result) => {
        //console.log("result from control","op", result.op,"item", result.item);

        // this.getXps();  
        this.flowOp(result.op, result.item)
          ;
      }, (reason) => { });
    }
  }


  //// FLUJO DE OPERACIONES SEGUN OP FORM /////

  flowOp(op: string, item: any) {
    this.selectCrudOp(op, item)   // hace el crud
    this.selectTicketOp(op, item)  // hace operacion de ticket si corresponde
  }


  ////// SELECCIONAR OPERACION CRUD  //////

  selectCrudOp(op: string, item: any) {

    switch (op) {
      case 'Agregar': {
        this.addItem(this.componente, item);
        break;
      }

      case 'Editar': {
        this.updateItem(this.componente, item);
        break;
      }
      case 'Eliminar': {
        this.deleteItem(this.componente, item);
        this.interOpService.addItem("facturacion", item)

        // pasar a funcion que genere el item
        let ndate = new Date()
        this.interOpService.addItem("caja", {
          "concepto": item.patente,
          "fecha": ndate ,// item.fechas["fechaSalidaDate"],
          "importe": item.saldo,
          "operacion": "ingreso"
        })

        break;
      }

      default: {
        console.log("sin operacion en case crud")
        break;
      }
    }
  };


  ///////////////////////////////
  ///// OPERACIONES CRUD ////////

  getAll(): void {
    this.dbFirebase.getAll(this.componente).subscribe(data => {
      this.data = data;
      localStorage.setItem(`${this.componente}`, JSON.stringify(data))
      console.log(this.data);
    })
  }


  deleteItem(componente: string, item: any): void {

    console.log("delete itemcomponent", item,)

    this.dbFirebase.delete(componente, item.id)
      .then((data) => console.log(data))
      .then(() => this.ngOnInit())
      .then(() => console.log("pasa por delete metodo?"))
      .catch((e) => console.log(e.message));

  }

  addItem(componente: string, item: any): void {

    console.log("add itemcomponent", item,)

    this.dbFirebase.create(componente, item)
      .then((data) => console.log(data))
      .then(() => this.ngOnInit())
      .catch((e) => console.log(e.message));



  }

  updateItem(componente: string, item: any): void {
    console.log("update itemcomponent", item,)

    this.dbFirebase.update(componente, item)
      .then((data) => console.log(data))
      .then(() => this.ngOnInit())
      .catch((e) => console.log(e.message));

  }

  /////////////////////////////////////////
  ///// ELEGIR OPERACION DE TICKET/////////

  selectTicketOp(op: string, item: any) {

    switch (op) {
      case 'Agregar': {
        this.openTicket("Ticket Ingreso", item)
        break;
      }

      case 'Eliminar': {
        this.openTicket("Ticket Salida", item)
        break;
      }

      case 'Reimprimir': {

        this.openTicket("Reimprimir", item);
        this.logger.log("ticket-reimpresion", item);
        // console.log(JSON.parse(localStorage.getItem("user")||`{}`))
        break;
      }


      // case 'Reimprimir': {
      //   let user= JSON.parse(localStorage.getItem("user")||`{}`)
      //   this.openTicket("Reimprimir", item);
      //   this.logger.log("ticket-reimpresion",item.patente);
      //   console.log(user['displayName'])
      //   break;
      // }

      default: {
        console.log("sin operacion en case crud")
        break;
      }
    }
  };



  /////  ABRIR FORMULARIO TICKET //////

  openTicket(modo: string, item: any) {
    {
      const modalRef = this.modalService.open(TicketEntradaComponent,
        {
          // scrollable: false,
          windowClass: 'myCustomModalClass',
          // keyboard: false,
          // backdrop: 'static'
        })

      let info = {
        modo: modo,
        item: item

      }


      modalRef.componentInstance.fromParent = info;
      modalRef.result.then((result) => {
        // console.log("result from control","op", result.op,"item", result.item);
        this.selectTicketOp(result.op, result.item)
          ;
      }, (reason) => { });
    }
  }

}