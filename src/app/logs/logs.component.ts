import { Component, OnInit } from '@angular/core';
import { DbFirestoreService } from '../servicios/database/db-firestore.service';
import { LogService } from '../servicios/log.service';
import { LanguageApp } from '../shared/DTLanguage';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  searchText!: string;
  componente:string="logger"
  data!: any;
  dtOptions: DataTables.Settings = {};

  constructor(private logger: LogService,
    private dbFirebase: DbFirestoreService,
    ) {
  }

  testLog(): void {
      this.logger.log("console","Test the `log()` Method");
  }


  ngOnInit(): void {
    this.getAll();
    this.dtOptions = {
      searching: false,
      dom: 't<"bottom"riflp><"clear">',
      language: LanguageApp.spanish_datatables,
      columnDefs: [
       // { orderable: false, targets: [6,7] },
       // { searchable: false, targets: [ 6,7] },
    ], 
    responsive: true
    };
  }

  getAll(): void {
    this.dbFirebase.getAll(this.componente).subscribe(data => {
      this.data = data;
      localStorage.setItem(`${this.componente}`, JSON.stringify(data))
      console.log(this.data);      
    })
  }

}
