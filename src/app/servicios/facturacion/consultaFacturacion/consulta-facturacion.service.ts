import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ConsultaFacturacionService {
  consultaFacturacion = {
    fechaDesde: '',
    fechaHasta: '',
    cantidadOperacion: 0,
    total: 0,
  };
  constructor() {}

  calcularFacturacion(fechas: any, facturacion: any) {
    let facturacionFiltrada = facturacion.filter((factura: any) => {
      factura.fechas.fechaSalidaDate =
        factura.fechas.fechaSalidaDate.toString();
      let fechaSalidaMilisegundos = new Date(
        factura.fechas.fechaSalidaDate
      ).getTime();
      return (
        fechaSalidaMilisegundos > fechas.fechaDesde &&
        fechaSalidaMilisegundos < fechas.fechaHasta
      );
    });

    this.consultaFacturacion.fechaDesde = this.convertirMilisegundosAFecha(
      fechas.fechaDesde
    );
    this.consultaFacturacion.fechaHasta = this.convertirMilisegundosAFecha(
      fechas.fechaHasta
    );
    this.consultaFacturacion.cantidadOperacion = facturacionFiltrada.length;
    this.consultaFacturacion.total = this.calularTotal(facturacionFiltrada);

    let respuestaFacturacion = {
      consultaFacturacion: this.consultaFacturacion,
      facturacion: facturacionFiltrada,
    };

    return respuestaFacturacion;
  }

  convertirMilisegundosAFecha(numero: number) {
    let date = moment(numero).format('DD MMM YYYY hh:mm a');
    return date;
  }

  calularTotal(facturacion: any) {
    let acumulador = 0;
    facturacion.forEach((factura: any) => {
      //por cada data de facturacion
      let dato = factura; //lo guarda en una nueva variable (pq sino no lo reconocia)
      acumulador = acumulador + dato.saldo; //saca el saldo y lo guarda en un acumulador
    });
    return acumulador;
  }
}
