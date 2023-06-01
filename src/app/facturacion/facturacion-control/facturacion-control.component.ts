import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaFacturacionService } from 'src/app/servicios/facturacion/consultaFacturacion/consulta-facturacion.service';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-facturacion-control',
  template: `
    <br /><br />
    <H1 class="display-1" style="text-align: center;">Facturacion </H1>
    <div>
      <button (click)="toggle()" id="bt" class="btn btn-outline-secondary">
        {{ buttonName }}
      </button>
    </div>

    <ng-container *ngIf="show">
      <app-consulta-facturacion
        (newItemEvent)="getMsg($event)"
        [respuestaFacturacion]="consultaFacturacion"
      ></app-consulta-facturacion>
    </ng-container>
    <app-facturacion-view
      [facturacionDelDia]="facturacionDelDia$"
      [totalFacturacionDelDia]="totalFacturacionDelDia"
      [respuestaFacturacion]="consultaFacturacion"
      (newItemEvent)="getMsg($event)"
    >
    </app-facturacion-view>
  `,

  styleUrls: ['./facturacion-control.component.scss'],
})
export class FacturacionControlComponent implements OnInit {
  componente: string = 'facturacion';

  facturacionDelDia$: any;

  consultaFacturacion!: any;
  totalFacturacionDelDia!: number;

  public show: boolean = false;
  public buttonName: any = 'Consultar Facturacion';

  fechasConsulta: any = {
    fechaDesde: 0,
    fechaHasta: 0,
  };

  constructor(
    private consultaFacturacionService: ConsultaFacturacionService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getAll(); //toma la facturacion del dia
  }

  getMsg(msg: any) {
    // console.log("consulta facturacion", msg.item);
    this.consultaFacturacionService
      .calcularFacturacion2(msg.item)
      .then((data) => {
        // console.log("consulta facturacion en componente", data);
        this.consultaFacturacion = data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggle() {
    this.show = !this.show;
    if (this.show) this.buttonName = 'Cerrar';
    else this.buttonName = 'Consultar Facturacion';
  }
  getAll(): void {
    let acumulador: number = 0;
    let dato: any;

    this.storageService.facturacion$.subscribe(
      (data) => (this.facturacionDelDia$ = data)
    );
    // console.log(this.facturacion$)
    this.facturacionDelDia$.forEach((datos: any) => {
      //por cada data de facturacion
      dato = datos; //lo guarda en una nueva variable (pq sino no lo reconocia)
      acumulador = acumulador + dato.saldo; //saca el saldo y lo guarda en un acumulador
    });
    this.totalFacturacionDelDia = acumulador; //guarda el valor del acumulador en una variable para enviar al view
  }
}
