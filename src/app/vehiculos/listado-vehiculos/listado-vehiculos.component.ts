import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';
import { VehiculosStorageService } from 'src/app/servicios/storage/vehiculos-storage.service';
import { LanguageApp } from 'src/app/shared/DTLanguage';

@Component({
  selector: 'app-listado-vehiculos',
  templateUrl: './listado-vehiculos.component.html',
  styleUrls: ['./listado-vehiculos.component.scss']
})
export class ListadoVehiculosComponent implements OnInit {
  searchText!: string;
  componente: string = 'Vehiculos';
  data!: any;
  dtOptions: DataTables.Settings = {};
  vehiculos: any[] = [];
  constructor(


    private vehiculosService: VehiculosStorageService,
    private storageService: StorageService
  ) {}



  ngOnInit(): void {
    // this.data = this.vehicle$;
    this.setDataTable();
    this.vehiculosService.data$.subscribe(data => {
      this.vehiculos = data;
    });
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