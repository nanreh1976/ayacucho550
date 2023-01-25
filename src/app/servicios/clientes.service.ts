import { Injectable, OnInit } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { VehiculosStorageService } from './storage/vehiculos-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService implements OnInit {
  vehiculos$: any;
  tarifas$: any;
  constructor(
    private vehiculosStorage: VehiculosStorageService,
    private storageService: StorageService
  ) {
    this.vehiculosStorage.data$.subscribe((data) => (this.vehiculos$ = data));
    this.storageService.tarifas$.subscribe((data) => (this.tarifas$ = data));
  }
  ngOnInit(): void {}

  buscarPatenteEnClientes(patente: string) {
    let respuesta: any = {
      clienteExiste: '',
      datosVehiculo: '',
    };

    let vehiculos = this.vehiculos$.filter(function (vehiculo: any) {
      return vehiculo.patente === patente;
    });


    if (vehiculos.length === 0) {
      respuesta.clienteExiste = false;
      return respuesta;
    } else {
      respuesta.datosVehiculo = vehiculos[0];
      respuesta.clienteExiste = true;
      return respuesta;
    }
  }

  buscarTarifa(id: number) {
    let tarifas = this.tarifas$.filter(function (tarifa: any) {
      return tarifa.id === id;
    });
    return tarifas;
  }
}
