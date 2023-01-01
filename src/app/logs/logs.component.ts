import { Component, OnInit } from '@angular/core';
import { LogService } from '../servicios/log.service';
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
    private logger: LogService,
    private storageService: StorageService
  ) {}

  testLog(): void {
    this.logger.log('console', 'Test the `log()` Method');
  }

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
