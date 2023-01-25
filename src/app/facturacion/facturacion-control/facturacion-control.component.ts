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
      [data]="facturacion$"
      [totalFacturacion]="totalFacturacion"
      [respuestaFacturacion]="consultaFacturacion"
      [facturacionDeldia]="facturacionDeldia"
      (newItemEvent)="getMsg($event)"
    >
    </app-facturacion-view>
  `,

  styleUrls: ['./facturacion-control.component.scss'],
})
export class FacturacionControlComponent implements OnInit {
  componente: string = 'facturacion';

  facturacion$: any;

  totalFacturacion!: number;

  consultaFacturacion!: any;

  facturacionDeldia!: any;

  fechasConsulta: any = {
    fechaDesde: 0,
    fechaHasta: 0,
  };

  totalFacturacionDia!: number;

  public show: boolean = false;
  public buttonName: any = 'Consultar Facturacion';

  toggle() {
    this.show = !this.show;
    if (this.show) this.buttonName = 'Cerrar';
    else this.buttonName = 'Consultar Facturacion';
  }

  constructor(
    private consultaFacturacionService: ConsultaFacturacionService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getAll(); //tomar datos de los vehiculos en playa
    this.facturacionDia();
  }

  getMsg(msg: any) {
    this.consultaFacturacion =
      this.consultaFacturacionService.calcularFacturacion(
        msg.item,
        this.facturacion$
      );
  }

  getAll(): void {
    let acumulador: number = 0;
    let dato: any;

    this.storageService.facturacion$.subscribe(
      (data) => (this.facturacion$ = data)
    );

    this.facturacion$.forEach((datos: any) => {
      //por cada data de facturacion
      dato = datos; //lo guarda en una nueva variable (pq sino no lo reconocia)
      acumulador = acumulador + dato.saldo; //saca el saldo y lo guarda en un acumulador
    });
    this.totalFacturacion = acumulador; //guarda el valor del acumulador en una variable para enviar al view
  }

  facturacionDia() {
    let facturacion = this.facturacion$;
    // console.log(facturacion);

    let hora2 = 23;
    let min2 = 59;

    let hoy = new Date().toLocaleDateString('es').split('/');
    this.fechasConsulta.fechaDesde = new Date(
      parseInt(hoy[2]),
      parseInt(hoy[1]) - 1,
      parseInt(hoy[0])
    );
    this.fechasConsulta.fechaHasta = new Date(
      parseInt(hoy[2]),
      parseInt(hoy[1]) - 1,
      parseInt(hoy[0]),
      hora2,
      min2
    );

    this.facturacionDeldia =
      this.consultaFacturacionService.calcularFacturacion(
        this.fechasConsulta,
        facturacion
      );


  }
}
