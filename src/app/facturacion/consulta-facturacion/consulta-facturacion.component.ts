import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-consulta-facturacion',
  templateUrl: './consulta-facturacion.component.html',
  styleUrls: ['./consulta-facturacion.component.scss'],
})
export class ConsultaFacturacionComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() respuestaFacturacion: any;

  titulo: string = 'consultaFecha';
  model1!: any;
  model2!: any;
  time1: any = { hour: '00', minute: '00' };
  time2: any = { hour: '23', minute: '59' };
  fechasConsulta: any = {
    fechaDesde: 0,
    fechaHasta: 0,
  };
  consultaFacturacion!: any;
  facturacion$: any

  constructor(
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private storageService: StorageService
    ) {}  

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  ngOnInit(): void {
    this.getFacturacion()

  }

  buscarFacturacion() {

    this.fechasConsulta.fechaDesde = new Date(
      this.model1.year,
      this.model1.month - 1,
      this.model1.day,
      this.time1.hour,
      this.time1.minute
    ).getTime();

    this.fechasConsulta.fechaHasta = new Date(
      this.model2.year,
      this.model2.month - 1,
      this.model2.day,
      this.time2.hour,
      this.time2.minute
    ).getTime();
    this.titulo = 'consulta facturacion';
    this.msgBack(this.titulo, this.fechasConsulta);

  }

  getFacturacion() {
    this.storageService.facturacion$.subscribe((data) => (this.facturacion$ = data));
  }

  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    };

    this.newItemEvent.emit(value);
  }
}
