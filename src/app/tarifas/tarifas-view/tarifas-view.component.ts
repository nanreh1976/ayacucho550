import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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


msgBack(op: string, item: any){
  let value ={
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