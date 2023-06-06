import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageApp } from 'src/app/shared/DTLanguage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playa-view',
  templateUrl: './playa-view.component.html',
  styleUrls: ['./playa-view.component.scss'],
})
export class PlayaViewComponent implements OnInit {
  @Input() data?: any;
  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'Playa';
  dtOptions: DataTables.Settings = {};
  msg: any;


  constructor() { }

  ngOnInit(): void {
    this.setearDataTable()
    // console.log("playa view", this.data)
  }


  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    };

    if (op === 'Reimprimir') {
      Swal.fire({
        title: '¿Desea reimprimir el ticket?',
        //text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.newItemEvent.emit(value);
        }
      });
    } else {
      this.newItemEvent.emit(value);
    }
  }




  setearDataTable() {
    this.dtOptions = {

      dom: 't<"bottom"riflp><"clear">',
      language: LanguageApp.spanish_datatables,
      columnDefs: [
        { orderable: false, targets: [5, 6] },
        { searchable: false, targets: [5, 6] },
       /*  { width: '10rem', targets: 3}, */
      /*   { width: '3rem', targets: 0},
        { width: '2rem', targets: 1},
        { width: '10rem', targets: 3}, */
        
      ],
      
      /* responsive: {
        breakpoints: [
          { name: 'desktop', width: Infinity },
          { name: 'desktop',  width: 1024 },
          { name: 'desktop',  width: 768 },
          { name: 'desktop',   width: 480 }
        ]
    } */

/* 
Extra extra large 	xxl 	≥1400px
Extra large 	xl 	≥1200px
Large 	lg 	≥992px
Medium 	md 	≥768px
Small 	sm 	≥576px
X-Small 	None 	<576px





 */

     /*  responsive: true, */
    }

  }

}

