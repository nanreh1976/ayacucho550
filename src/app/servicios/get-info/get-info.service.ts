import { Injectable } from '@angular/core';
import { CajaStorageService } from '../caja/caja-storage.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetInfoService {
  nombreUsuario!: string;
  listadoPatentes: string[] = [];
  private user$: any;
  private playa$: any;

  constructor(
    private storageService: StorageService,
    private cajaStorageService: CajaStorageService
  ) {
    this.storageService.usuario$.subscribe((data) => (this.user$ = data));
    this.storageService.playa$.subscribe((data) => (this.playa$ = data));
  }

  getUser() {
    this.nombreUsuario = this.user$['displayName'];
  }

  listarPatentes() {
    let playa = this.playa$;

    //recorre playa buscando barcode
    for (var it of playa) {
      let pat = it['patente'];
      // console.log(cod, pat);
      this.listadoPatentes.push(pat);
    }
    console.log("aver 2", this.listadoPatentes)
  }

  resetAll(){
    this.nombreUsuario=""
    this.listadoPatentes=[]
  }

  getCierreCaja() {
    this.resetAll();
    this.getUser();
    this.listarPatentes();
  }
}
