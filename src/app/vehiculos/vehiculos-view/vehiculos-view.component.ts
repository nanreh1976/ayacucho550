import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vehiculos-view',
  templateUrl: './vehiculos-view.component.html',
  styleUrls: ['./vehiculos-view.component.scss']
})
export class VehiculosViewComponent implements OnInit {

 

  @Input() data?: any
  @Input() $estado: any
  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'Playa'

  
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