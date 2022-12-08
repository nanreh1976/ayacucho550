import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';


import { TarifasFormComponent } from '../tarifas-form/tarifas-form.component';
import { TarifasViewComponent } from '../tarifas-view/tarifas-view.component';


@Component({
  selector: 'app-tarifas-control',
  template: `
  <app-tarifas-view
  [data]=data   
 (newItemEvent)="getMsg($event)"
  ></app-tarifas-view>
  
              `,
  styleUrls: ['./tarifas-control.component.scss']
})
export class TarifasControlComponent implements OnInit {



componente: string = 'tarifas'




 
  data!: any;
  //esto reemplaza in memory api
  /* data: any = [{
    id: 3,
    nombre: "auto-basico",               // nombre de la tarifa 
    categoria: "auto",            // tipo de vehiculo
    fraccion: 30,             // fraccion minima de facturacion
    unidad_tiempo: "min",        // minutos, horas, dias, semanas, mes
    valor: 150,                
    tolerancia: 5,           // rango de tolerancia
  },
    {
      id: 4,
      nombre: "camioneta-basico",               // nombre de la tarifa 
      categoria: "camioneta",            // tipo de vehiculo
      fraccion: 30,             // fraccion minima de facturacion
      unidad_tiempo: "min",        // minutos, horas, dias, semanas, mes
      valor: 180,                
      tolerancia: 5,           // rango de tolerancia
    },
    
    {
      id: 2,
      nombre: "moto-basico",               // nombre de la tarifa 
      categoria: "moto",            // tipo de vehiculo
      fraccion: 30,             // fraccion minima de facturacion
      unidad_tiempo: "min",        // minutos, horas, dias, semanas, mes
      valor: 120,                
      tolerancia: 5,           // rango de tolerancia
    },
    {
      id: 7,
      nombre: "auto-mes",               // nombre de la tarifa 
      categoria: "auto",            // tipo de vehiculo
      fraccion: 1,             // fraccion minima de facturacion
      unidad_tiempo: "mes",        // minutos, horas, dias, semanas, mes
      valor: 8500,                
      tolerancia: 0,           // rango de tolerancia
    },
  ];

 */



  constructor(private modalService: NgbModal,             
              private fb: FormBuilder,           
              private dbFirebase: DbFirestoreService,  
  ) {}



    ngOnInit(): void {
      this.getAll(); //tomar datos de las tarifas
  }



  getMsg(msg: any) {

    this.openForm(msg.op, msg.item)
  }

  openForm(modo: string, item: any) {
    {
      const modalRef = this.modalService.open(TarifasFormComponent,
        {

          windowClass: 'myCustomModalClass',


        })

        let info = {
          modo: modo,
          item: item

        }


        modalRef.componentInstance.fromParent = info;
        modalRef.result.then((result) => {



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
        console.log("sin operacion en el case crud")
        break;
      }
    }
  };
 
  // CRUD


getAll(): void {
  this.dbFirebase.getAll("tarifas").subscribe(data => {
    this.data = data;
    localStorage.setItem(`${"tarifas"}`, JSON.stringify(this.data))
    //console.log(this.tarifas);      
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



}

