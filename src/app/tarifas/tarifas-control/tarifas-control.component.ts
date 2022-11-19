import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


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




 
  //data!: [];
  //esto reemplaza in memory api
  data: any = [{
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





  constructor(private modalService: NgbModal,             
              private fb: FormBuilder,              
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
 /*  this.servicioDatosService.getAll(this.componente).subscribe (
  datos => {this.data = datos;
  console.log("get all ", this.componente, this.data)

  }
); */
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

  // console.log("add itemcomponent", item, )
  /* this.servicioDatosService.addItem(componente, item) 
  .subscribe
  (data => { 
    this.data = data; 
    this.ngOnInit();
  }); */

  }

 


updateItem(componente: string, item: any): void {
 
/*   this.servicioDatosService.updateItem(componente, item, item.id)
  .subscribe
  (data => { 
    this.data = data; 
    this.ngOnInit();
  }); */

  }



}

