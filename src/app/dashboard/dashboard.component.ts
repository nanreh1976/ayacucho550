import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbFirestoreService } from '../servicios/database/db-firestore.service';
import { InterOpService } from '../servicios/inter-op.service';
import { LogService } from '../servicios/log.service';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  titulo: string = 'empresa'
  searchText!: string;

  

  // nombre del crud / componente
  componente: string = 'empresa'
  
  // data recibida del crud
  data!: any;
  
  constructor(private modalService: NgbModal,   
    private fb: FormBuilder,
    private dbFirebase: DbFirestoreService,
    private interOpService: InterOpService,
    private logger: LogService,
  ) {}


  ngOnInit(): void {    
    this.getAll();  //tomar datos de los vehiculos en playa
this.getuser();
  }


getuser(){
   console.log(JSON.parse(localStorage.getItem('user')||`{}`))
  
  }

  /// RECIBE MENSAJE DE LA VISTA ///

  // getMsg(msg: any) {
  //   // console.log(msg, "from parent");
  //   this.openForm(msg.op, msg.item)
  // }


  /// MODAL DEL FORM SEGUN INFO DE LA VISTA ////


  openForm(modo: string, item: any) {
    {
      const modalRef = this.modalService.open(DashboardFormComponent,
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

  }



  ////// SELECCIONAR OPERACION CRUD  //////

  selectCrudOp(op: string, item: any) {

    switch (op) {
      // case 'Agregar': {
      //   this.addItem(this.componente, item);
      //   break;
      // }

      case 'Editar': {
        this.updateItem(this.componente, item);
        break;
      }
      // case 'Eliminar': {
      //   this.deleteItem(this.componente, item);
      //   this.interOpService.addItem("facturacion", item)
      //   break;
      // }

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


  // deleteItem(componente: string, item: any): void {

  //   console.log("delete itemcomponent", item,)
   
  //     this.dbFirebase.delete(componente, item.id)
  //     .then((data) => console.log(data))      
  //     .then(() => this.ngOnInit())
  //     .then(() => console.log("pasa por delete metodo?")   )
  //     .catch((e) => console.log(e.message));
      
  // }

  // addItem(componente: string, item: any): void {

  //    console.log("add itemcomponent", item,)
   
  //     this.dbFirebase.create(componente, item)
  //     .then((data) => console.log(data))
  //     .then(() => this.ngOnInit())
  //     .catch((e) => console.log(e.message));
       
      

  // }

  updateItem(componente: string, item: any): void {
    console.log("update itemcomponent", item,)
    
        this.dbFirebase.update(componente, item)
        .then((data) => console.log(data))
        .then(() => this.ngOnInit())
        .catch((e) => console.log(e.message));

  }


  
}