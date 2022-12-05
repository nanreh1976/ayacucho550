import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'  // servicios modal
import { ConsultaFacturacion } from 'src/app/interfaces/consulta-facturacion';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { ConsultaFacturacionService } from 'src/app/servicios/facturacion/consultaFacturacion/consulta-facturacion.service';


import { ConsultaFacturacionComponent } from '../consulta-facturacion/consulta-facturacion.component';
import { FacturacionFormComponent } from '../facturacion-form/facturacion-form.component';


@Component({
  selector: 'app-facturacion-control',
  template: `
<br><br>
<H1 class="display-1" style="text-align: center;">Facturacion </H1>
<div>
<button (click)="toggle()" id="bt" class="btn btn-outline-secondary">
    {{buttonName}}
</button>
</div>

<ng-container *ngIf="show">
<app-consulta-facturacion (newItemEvent)="getMsg($event)" [respuestaFacturacion]=consultaFacturacion  ></app-consulta-facturacion>

</ng-container>
<app-facturacion-view

  [data]=data   
  [totalFacturacion]=totalFacturacion
  [respuestaFacturacion]=consultaFacturacion 
  [facturacionDeldia]=facturacionDeldia  
  (newItemEvent)="getMsg($event)"  >
 </app-facturacion-view>
  
  
              `,


  styleUrls: ['./facturacion-control.component.scss']
})
export class FacturacionControlComponent implements OnInit {

  //@ViewChild('enviarConsulta', { static: false }) enviarConsulta!: ConsultaFacturacionComponent; 

  // nombre del crud / componente
  componente: string = 'facturacion'
  // reactiveforms, modo edicion, delete etc
  //modo!: string;



  // data recibida del crud
  data!: any;

  totalFacturacion!: number;

  consultaFacturacion!: any;

  facturacionDeldia!: any;

  fechasConsulta: any = {
    fechaDesde: 0,
    fechaHasta: 0,
  }

  totalFacturacionDia!: number

  public show: boolean = false;
  public buttonName: any = 'Consultar Facturacion';



  toggle() {this.show = !this.show;

    // Change the name of the button.
    if (this.show)
      this.buttonName = "Cerrar";
    else
      this.buttonName = "Consultar Facturacion";
  }


  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private dbFirebase: DbFirestoreService,
    private consultaFacturacionService: ConsultaFacturacionService,
  ) {

  }



  ngOnInit(): void {
    this.getAll();  //tomar datos de los vehiculos en playa
    this.facturacionDia();
  }


  getMsg(msg: any) {
    console.log(msg, "from parent");
    if (msg.op === "consulta facturacion") {
      //console.log("esto es facturacion", this.data);
      this.consultaFacturacion = this.consultaFacturacionService.calcularFacturacion(msg.item, this.data);

      //console.log("esto es facturacion-control: ", this.consultaFacturacion);
      //console.log(this.consultaFacturacion);

      this.ngOnInit()

    } else {
      this.openForm(msg.op, msg.item)
    }
    //this.openForm(msg.op, msg.item)
  }

  openForm(modo: string, item: any) {
    {
      const modalRef = this.modalService.open(FacturacionFormComponent,
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

        // this.getXps();  
        this.selectCrudOp(result.op, result.item)
          ;
      }, (reason) => { });
    }
  }



  // seleccionar operacion CRUD

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
    let acumulador: number = 0;
    let dato: any

    this.dbFirebase.getAll(this.componente).subscribe(data => {
      this.data = data;
      localStorage.setItem(`${this.componente}`, JSON.stringify(data))
      //console.log(this.data);      

      this.data.forEach((datos: any) => {                 //por cada data de facturacion
        dato = datos                                  //lo guarda en una nueva variable (pq sino no lo reconocia) 
        //console.log(dato);    
        acumulador = acumulador + dato.saldo;         //saca el saldo y lo guarda en un acumulador
        //console.log(acumulador);    
      })
      this.totalFacturacion = acumulador;             //guarda el valor del acumulador en una variable para enviar al view
      //console.log(this.totalFacturacion);


    }
    );
  }


  deleteItem(componente: string, item: any): void {
    /* console.log("delete component", item, item.id)
   this.servicioDatosService.deleteItem(componente, item.id)
   .subscribe 
   (data => { 
     this.data = data; 
     this.ngOnInit();
   }) */
  }

  addItem(componente: string, item: any): void {
    /* 
    console.log("add itemcomponent", item, )
    this.servicioDatosService.addItem(componente, item) 
    .subscribe
    (data => { 
      this.data = data; 
      this.ngOnInit();
    });
     */
  }

  updateItem(componente: string, item: any): void {
    /* 
    this.servicioDatosService.updateItem(componente, item, item.id)
    .subscribe
    (data => { 
      this.data = data; 
      this.ngOnInit();
    });
     */
  }

  facturacionDia() {

    let facturacion = JSON.parse(localStorage.getItem("facturacion") || `{}`)
    console.log(facturacion)


    let hora1 = 0;
    let hora2 = 23;
    let min1 = 0;
    let min2 = 59;

    let hoy = new Date().toLocaleDateString('es').split("/")
    //console.log("esto es el metodo facturacionDia, hoy: ", hoy);
    this.fechasConsulta.fechaDesde = new Date(parseInt(hoy[2]), parseInt((hoy[1])) - 1, parseInt(hoy[0]),);
    //console.log("esto es el metodo facturacionDia, fechaDesde: ", this.fechasConsulta.fechaDesde );
    this.fechasConsulta.fechaHasta = new Date(parseInt(hoy[2]), parseInt(hoy[1]) - 1, parseInt(hoy[0]), hora2, min2);
    //console.log("esto es el metodo facturacionDia, fechaHasta: ", this.fechasConsulta.fechaHasta);

    /*   this.fechasConsulta.fechaDesde = fechaDesde;
      this.fechasConsulta.fechaHasta = fechaHasta;   */

    //console.log(this.fechasConsulta);
    //console.log(this.data);


    this.facturacionDeldia = this.consultaFacturacionService.calcularFacturacion(this.fechasConsulta, facturacion);

    console.log("esto es facturacion del dia. facturacionDeldia: ", this.facturacionDeldia);


  }





}