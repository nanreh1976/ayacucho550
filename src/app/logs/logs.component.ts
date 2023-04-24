import { Component, OnInit } from '@angular/core';

import { StorageService } from '../servicios/storage/storage.service';
import { LanguageApp } from '../shared/DTLanguage';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  searchText!: string;
  componente: string = 'logger';
  data!: any;
  dtOptions: DataTables.Settings = {};

  constructor(

    private storageService: StorageService
  ) {}



  ngOnInit(): void {
    this.data = this.storageService.logger$;
    this.setDataTable();
  }

  setDataTable() {
    this.dtOptions = {
      // searching: false,
      dom: 't<"bottom"riflp><"clear">',
      language: LanguageApp.spanish_datatables,
      columnDefs: [
        // { orderable: false, targets: [6,7] },
        // { searchable: false, targets: [ 6,7] },
      ],
      responsive: true,
    };
  }
}
