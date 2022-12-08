import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  
  searchText!: string;

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
      this.newItemEvent.emit(value);
    }
  }



  constructor() { }
  msg: any
  ngOnInit(): void {
  }
}