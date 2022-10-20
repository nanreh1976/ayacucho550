import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-playa-log-view',
  templateUrl: './playa-log-view.component.html',
  styleUrls: ['./playa-log-view.component.scss']
})

export class PlayaLogViewComponent implements OnInit {




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