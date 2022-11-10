import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';



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
  @Input() totalFacturacion?:number;

  consultaForm!:any;
  minDateTime: Date;
  maxDateTime: Date;
  searchText!: string;

  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    }
    this.newItemEvent.emit(value);
  }



  constructor(private fb: FormBuilder) {
    this.consultaForm = this.fb.group({
      desde: [''],
      hasta: [''],        
    });   
    this.minDateTime = new Date("11/1/2016 10:00 AM");
    this.maxDateTime = new Date("11/27/2016 10:00 PM");
   }
  msg: any
  ngOnInit(): void {
  }
}