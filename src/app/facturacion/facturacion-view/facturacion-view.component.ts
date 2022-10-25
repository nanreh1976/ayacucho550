import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-facturacion-view',
  templateUrl: './facturacion-view.component.html',
  styleUrls: ['./facturacion-view.component.scss']
})
export class FacturacionViewComponent implements OnInit {



  @Input() data?: any
  @Input() $estado: any
  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'facturacion'

  
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