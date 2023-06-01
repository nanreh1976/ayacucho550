import { Component, OnInit } from '@angular/core';
import { DbFirestoreService } from '../servicios/database/db-firestore.service';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../interfaces/empresa';
import { StorageService } from '../servicios/storage/storage.service';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss'],
})
export class PerfilEmpresaComponent implements OnInit {
  titulo: string = '';
  searchText!: string;
  empresa: any = {};

  // nombre del crud / componente
  componente: string = 'empresa';

  // data recibida del crud
  data: Empresa;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private dbFirebase: DbFirestoreService,
    private storageService:StorageService
  ) {}

  ngOnInit(): void {
    this.getAll(); 

  }


  /// MODAL DEL FORM SEGUN INFO DE LA VISTA ////

  openForm(modo: string, item: any) {
    {
      const modalRef = this.modalService.open(EmpresaFormComponent, {
        windowClass: 'myCustomModalClass',
      });

      let info = {
        modo: modo,
        item: item,
      };


      modalRef.componentInstance.fromParent = info;
      modalRef.result.then(
        (result) => {
          this.flowOp(result.op, result.item);
        },
        (reason) => {}
      );
    }
  }

  //// FLUJO DE OPERACIONES SEGUN OP FORM /////

  flowOp(op: string, item: any) {
    this.selectCrudOp(op, item); // hace el crud
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


      default: {
        // console.log('sin operacion en case crud');
        break;
      }
    }
  }

  ///////////////////////////////
  ///// OPERACIONES CRUD ////////

  getAll(): void {
    this.storageService.empresa$.subscribe((data) => {


      this.data = data;
      // console.log(this.data);
    });
  }


  addItem(componente: string, item: any): void {
    // console.log('add itemcomponent', item);

    this.dbFirebase
      .create(componente, item)
     // .then((data) => console.log(data))
      .then(() => this.ngOnInit())
      .catch((e) => console.log(e.message));
  }

  updateItem(componente: string, item: any): void {
    console.log('update itemcomponent', item);

    this.dbFirebase
      .update(componente, item)
     // .then((data) => console.log(data))
      .then(() => this.ngOnInit())
     // .catch((e) => console.log(e.message));
  }
}
