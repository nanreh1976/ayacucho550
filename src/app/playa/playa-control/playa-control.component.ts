import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'  // servicios modal
import { LoggedService } from 'src/app/logged.service';
import { ServicioDatosService } from 'src/app/servicio-datos.service';
import { Vehiculo } from 'src/app/vehiculo';
import { PlayaFormComponent } from '../playa-form/playa-form.component';


@Component({
  selector: 'app-playa-control',
  template: `


<app-playa-view
  [data]=data 
  [$estado]=$estado   
 (newItemEvent)="getMsg($event)"
  ></app-playa-view>
  
              `,

  styleUrls: ['./playa-control.component.scss']
})
export class PlayaControlComponent implements OnInit {

 // nombre del crud / componente
 componente: string = 'vehiculos'
  // reactiveforms, modo edicion, delete etc
  //modo!: string;

 // propiedades logged service
  $estado;

// data recibida del crud
  data!: [];



  constructor(private modalService: NgbModal,
              private loggedService: LoggedService,
              private fb: FormBuilder,
              private servicioDatosService: ServicioDatosService
  ) {

    this.$estado = loggedService.logged$;

  }



  ngOnInit(): void {
    this.$estado.subscribe
    this.getAll();  //tomar datos de los vehiculos en playa
    
  }

 
  getMsg(msg: any) {
    // console.log(msg, "from parent");
     this.openForm(msg.op, msg.item)
  }

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
    // case 'Eliminar': {
    //   this.delete( item.id);
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
  this.servicioDatosService.getAll(this.componente).subscribe (
  datos => {this.data = datos;
 // console.log("get all ", this.componente, this.data)

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

  // console.log("add itemcomponent", item, )
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