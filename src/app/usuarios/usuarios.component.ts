import { Component, OnInit } from '@angular/core';
import { StorageService } from '../servicios/storage/storage.service';
import { LanguageApp } from 'src/app/shared/DTLanguage';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

data$:any
dtOptions: DataTables.Settings = {};
  constructor(
    private storageService:StorageService
  ) { }

  ngOnInit(): void {
    this.data$ = this.storageService.usuarios$;

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

}
