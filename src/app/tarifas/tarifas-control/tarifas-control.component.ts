import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { StorageService } from 'src/app/servicios/storage.service';


import { TarifasFormComponent } from '../tarifas-form/tarifas-form.component';
import { TarifasViewComponent } from '../tarifas-view/tarifas-view.component';


@Component({
  selector: 'app-tarifas-control',
  template: `
  <app-tarifas-view
  [data]=data$   
 (newItemEvent)="getMsg($event)"
  ></app-tarifas-view>
  
              `,
  styleUrls: ['./tarifas-control.component.scss']
})
export class TarifasControlComponent implements OnInit {



componente: string = 'tarifas'

  data$: any;

  constructor(private modalService: NgbModal,             
              private fb: FormBuilder,           
              private storage: StorageService
  ) {}

  ngOnInit(): void {
      this.data$ = this.storage.tarifas$
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
          this.storage.addItem(this.componente, item);
          break;
      }
      
      case 'Editar': {
        this.storage.updateItem(this.componente, item);
      break;
    }
       case 'Eliminar': {
        this.storage.deleteItem(this.componente, item);
        break;
      }
 
       default: {
        console.log("sin operacion en el case crud")
        break;
      }
    }
  };
 
}

