import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-clientes-view',
  templateUrl: './clientes-view.component.html',
  styleUrls: ['./clientes-view.component.scss']
})
export class ClientesViewComponent implements OnInit {

  
  @Input() data?: any
  @Input() $estado: any
  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'clientes';
  vehiculo: string = 'Vehiculo';

  
  searchText!: string;

  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    }
    this.newItemEvent.emit(value);
  }



  constructor() { }
  msg: any
  ngOnInit(): void {
  }
}