import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageApp } from 'src/app/shared/DTLanguage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-view',
  templateUrl: './clientes-view.component.html',
  styleUrls: ['./clientes-view.component.scss']
})
export class ClientesViewComponent implements OnInit {

  
  @Input() data?: any 
  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'clientes';
  vehiculo: string = 'Vehiculo';
  dtOptions: DataTables.Settings = {};
  msg: any
  




  constructor() { }
  
  ngOnInit(): void {
this.setDataTableOptions()
}


  msgBack(op: string, item: any) {    
    let value = {
      op: op,
      item: item,
    }
    if(op === 'Eliminar'){
      Swal.fire({
        title: '¿Desea eliminar el cliente?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
         /*  Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success' 
          )*/
          this.newItemEvent.emit(value);
        }
      })
    }else{
      console.log(value);
      
      this.newItemEvent.emit(value);
    }
  }


setDataTableOptions(){
  this.dtOptions = {
    searching: false,
    dom: 't<"bottom"riflp><"clear">',
    language: LanguageApp.spanish_datatables,
    columnDefs: [
      { orderable: false, targets: [7,8,9] },
      { searchable: false, targets: [ 7,8,9] },
  ]
  };
}

 
 


}