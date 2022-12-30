import { Component, OnInit } from '@angular/core';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { LanguageApp } from 'src/app/shared/DTLanguage';

@Component({
  selector: 'app-caja-log',
  templateUrl: './caja-log.component.html',
  styleUrls: ['./caja-log.component.scss']
})
export class CajaLogComponent implements OnInit {

  data: any;
  dtOptions: DataTables.Settings = {};
  componente: string = 'cajaLog';

  constructor(
   private storageService:StorageService
  ) {
 
   }

  ngOnInit(): void {
   this.data=this.storageService.cajaLog$

this.setDataTable()
  }

  setDataTable(){
    this.dtOptions = {
      // searching: false,
      dom: 't<"bottom"riflp><"clear">',
      language: LanguageApp.spanish_datatables,
    //   columnDefs: [
    //     { orderable: false, targets: [7,8,9] },
    //     { searchable: false, targets: [ 7,8,9] },
    // ]
    };
  }



// interface cajaLog

// apertura: 5 de diciembre de 2022, 15:13:36 UTC-3
// cierre: 6 de diciembre de 2022, 19:09:20 UTC-3
// estado: "abierto"
// logId: "x"
// usuario: ""


}
