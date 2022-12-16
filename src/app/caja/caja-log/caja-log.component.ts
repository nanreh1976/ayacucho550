import { Component, OnInit } from '@angular/core';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';

@Component({
  selector: 'app-caja-log',
  templateUrl: './caja-log.component.html',
  styleUrls: ['./caja-log.component.scss']
})
export class CajaLogComponent implements OnInit {

  cajaLog: any;

  componente: string = 'cajaLog';

  constructor(
    private dbFirebase: DbFirestoreService
  ) {
 
   }

  ngOnInit(): void {
    this.getCajasAbiertas();
  }

  getCajasAbiertas() {
    // busca en caja log todos los docs con estado abierto
    this.dbFirebase
      .getByFieldValue('cajaLog', 'estado', 'abierto')
      .subscribe((ref) => {
        console.log('caja abierta', JSON.stringify(ref));
        this.cajaLog = ref[0];
      });
  }

}
