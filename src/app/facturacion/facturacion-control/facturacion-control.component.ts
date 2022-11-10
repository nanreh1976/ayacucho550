import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'  // servicios modal
import { ConsultaFacturacion } from 'src/app/interfaces/consulta-facturacion';
import { ConsultaFacturacionService } from 'src/app/servicios/facturacion/consultaFacturacion/consulta-facturacion.service';
import { LoggedService } from 'src/app/servicios/logged.service';
import { ServicioDatosService } from 'src/app/servicios/servicio-datos.service';
import { ConsultaFacturacionComponent } from '../consulta-facturacion/consulta-facturacion.component';
import { FacturacionFormComponent } from '../facturacion-form/facturacion-form.component';


@Component({
  selector: 'app-facturacion-control',
  template: `
<app-consulta-facturacion (newItemEvent)="getMsg($event)"  ></app-consulta-facturacion>

<app-facturacion-view

  [data]=data 
  [$estado]=$estado  
  [totalFacturacion]=totalFacturacion 
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

// propiedades logged service
$estado;

// data recibida del crud
data!: [];

totalFacturacion!:number;


consultaFacturacion!:any;



constructor(private modalService: NgbModal,
            private loggedService: LoggedService,
            private fb: FormBuilder,
            private servicioDatosService: ServicioDatosService,
            private consultaFacturacionService: ConsultaFacturacionService,
) {

  this.$estado = loggedService.logged$;

}



ngOnInit(): void {
  this.$estado.subscribe
  this.getAll();  //tomar datos de los vehiculos en playa
  //this.facturacionTotal();
}


getMsg(msg: any) {
  // console.log(msg, "from parent");
  /* if(msg.op === "consultaFecha"){
    //console.log(msg);
    this.consultaFacturacion = this.consultaFacturacionService.calcularFacturacion(msg.item, this.data);
    
    console.log("esto es facturacion-control: ", this.consultaFacturacion);
    this.ngOnInit()
    
  }else{
   this.openForm(msg.op, msg.item)
  } */
  this.openForm(msg.op, msg.item)
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

selectCrudOp(op: string, item:any) {

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
let acumulador:number = 0;
let dato:any
this.servicioDatosService.getAll(this.componente).subscribe (
datos => {this.data = datos;
   //console.log("get all ", this.componente, this.data)
   
   this.data.forEach((datos) => {                 //por cada data de facturacion
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
 console.log("delete component", item, item.id)
this.servicioDatosService.deleteItem(componente, item.id)
.subscribe 
(data => { 
  this.data = data; 
  this.ngOnInit();
})
}

addItem(componente: string, item: any): void {

console.log("add itemcomponent", item, )
this.servicioDatosService.addItem(componente, item) 
.subscribe
(data => { 
  this.data = data; 
  this.ngOnInit();
});

}

updateItem(componente: string, item: any): void {

this.servicioDatosService.updateItem(componente, item, item.id)
.subscribe
(data => { 
  this.data = data; 
  this.ngOnInit();
});

}





}