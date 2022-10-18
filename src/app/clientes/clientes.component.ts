import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'  // servicios modal
import { LoggedService } from '../logged.service';   // servicios logged
import { ServicioDatosService } from '../servicio-datos.service';
import { Vehiculo } from '../vehiculo';
import { ClientesFormComponent } from './clientes-form/clientes-form.component'; 


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  searchText!: string;

  // reactiveforms

  modo!: number;


  // propiedades ng modal
  xps: any;


  // propiedades logged service
  $estado;


  //#region form related

  


  

 

  //#endregion

  //#region Modal related



  //#endregion

  constructor(private modalService: NgbModal,
              private loggedService: LoggedService,
              private fb: FormBuilder,
              private servicioDatosService: ServicioDatosService
  ) {

    this.$estado = loggedService.logged$;

  }

  ngOnInit(): void {
    this.$estado.subscribe
    // actualizar las xps
    this.getXps(); 
  
    
  }

  //#region CRUD methods

  getXps(): void {
    this.servicioDatosService.getXps().subscribe(xps => {
      this.xps = xps;
    });

  }  

  //#endregion Methods

  openXpForm(empleo: any, modo: number) {
    {
      const modalRef = this.modalService.open(ClientesFormComponent,
        {
          // scrollable: false,
          windowClass: 'myCustomModalClass',
          // keyboard: false,
          // backdrop: 'static'
        })

      let data = {
        empleo: empleo,
        modo: modo
      }

      modalRef.componentInstance.fromParent = data;
      modalRef.result.then((result) => {
        console.log(result);
        this.getXps();   //// recarga las xps cuando vuelve del modal
        ;
      }, (reason) => { });
    }
  }

}