import { Component, OnInit } from '@angular/core';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { LanguageApp } from 'src/app/shared/DTLanguage';

@Component({
  selector: 'app-caja-log',
  templateUrl: './caja-log.component.html',
  styleUrls: ['./caja-log.component.scss']
})
export class CajaLogComponent implements OnInit {

  data: any;
  dtOptions: DataTables.Settings = {};

  
  searchText!: string;
  componente: string = 'cajaLog';

  constructor(
    private dbFirebase: DbFirestoreService
  ) {
 
   }

  ngOnInit(): void {
    this.getAllSorted();

    this.dtOptions = {
      searching: false,
      dom: 't<"bottom"riflp><"clear">',
      language: LanguageApp.spanish_datatables,
    //   columnDefs: [
    //     { orderable: false, targets: [7,8,9] },
    //     { searchable: false, targets: [ 7,8,9] },
    // ]
    };
  }

  getAllSorted() {
    // pasar campo y orden (asc o desc)
    this.dbFirebase
      .getAllSorted(this.componente, 'apertura', 'desc')
      .subscribe((data) => {
        this.data = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as {}),
          } //as unknown as Icaja;
        });

        // guardar en el local storage
        localStorage.setItem(`${this.componente}`, JSON.stringify(data));

      });
  }

// interface cajaLog

// apertura: 5 de diciembre de 2022, 15:13:36 UTC-3
// cierre: 6 de diciembre de 2022, 19:09:20 UTC-3
// estado: "abierto"
// logId: "x"
// usuario: ""


}
