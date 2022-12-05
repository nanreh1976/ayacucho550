import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-caja-view',
  templateUrl: './caja-view.component.html',
  styleUrls: ['./caja-view.component.scss']
})
export class CajaViewComponent implements OnInit {

 
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
    this.newItemEvent.emit(value);
  }



  constructor() { }
  msg: any
  ngOnInit(): void {
  }
}