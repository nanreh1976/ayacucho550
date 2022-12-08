import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playa-view',
  templateUrl: './playa-view.component.html',
  styleUrls: ['./playa-view.component.scss']
})
export class PlayaViewComponent implements OnInit {


  @Input() data?: any
  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'Playa'

  
  searchText!: string;

  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    }
    
    if (op === 'Reimprimir'){
      Swal.fire({
        title: '¿Desea reimprimir el ticket?',
        //text: "You won't be able to revert this!",
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
    } else{
      this.newItemEvent.emit(value);
    }  
    
  }



  constructor() { }
  msg: any
  ngOnInit(): void {
  }
}