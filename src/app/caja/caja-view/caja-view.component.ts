import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LanguageApp } from 'src/app/shared/DTLanguage';

@Component({
  selector: 'app-caja-view',
  templateUrl: './caja-view.component.html',
  styleUrls: ['./caja-view.component.scss'],
})
export class CajaViewComponent implements OnInit {
  @Input() data$: any ;  // desde caja service

  @Input() usuario?: any;
  @Input() sesionCaja: Observable<any>;  // sesiones de caja
  @Input() $modoCaja: any;  //abierta cerrada admin block
  @Input() $estadoCaja: any;
  @Input() loading$: any;  // todavia no recibio datos del server
  @Input() noResults$: any;  // recibio datos del server pero vacios
  @Input() saldo$:any;

  @Output() newItemEvent = new EventEmitter<any>();
  //titulo: string = 'caja';

  msg: any;
  searchText!: string;
  dtOptions: DataTables.Settings = {};


  constructor(private router: Router) {}

  ngOnInit(): void {

    // console.log ("caja View", JSON.stringify(this.cajaLog))

    //opciones para dataTable
    this.dtOptions = {
      searching: true,
      dom: 't<"bottom"riflp><"clear">',
      language: LanguageApp.spanish_datatables,
      columnDefs: [
        //   { orderable: false, targets: [7,8,9] },
        // { searchable: false, targets: [ 7,8,9] },
        { width: '3rem', targets: 0},
      ],
      responsive: true,
    };
  }

  // navigateToClientes() {
  //   this.router.navigate(['home/clientes']);
  // }



  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    };
    this.newItemEvent.emit(value);
  }
}
