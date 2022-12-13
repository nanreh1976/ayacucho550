import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageApp } from 'src/app/shared/DTLanguage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarifas-view',
  templateUrl: './tarifas-view.component.html',
  styleUrls: ['./tarifas-view.component.scss']
})
export class TarifasViewComponent implements OnInit {


@Input() data?: any
@Output() newItemEvent = new EventEmitter<any>();
titulo: string = 'tarifas'

searchText!: string;
dtOptions: DataTables.Settings = {};


msgBack(op: string, item: any){
  let value ={
    op: op,
    item: item,
  }
  
  if(op === 'Eliminar'){
    Swal.fire({
      title: '¿Desea eliminar la tarifa?',
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
    this.newItemEvent.emit(value);
  } 
  
}



  constructor() { }
  msg: any
  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      dom: 't<"bottom"riflp><"clear">',
      language: LanguageApp.spanish_datatables,
      columnDefs: [
        { orderable: false, targets: [6,7] },
        { searchable: false, targets: [ 6,7] },
    ]
    };
  }
}