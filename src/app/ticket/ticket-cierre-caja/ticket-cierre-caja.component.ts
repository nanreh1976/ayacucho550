import { Component, OnInit } from '@angular/core';
import { GetInfoService } from 'src/app/servicios/get-info/get-info.service';

@Component({
  selector: 'app-ticket-cierre-caja',
  templateUrl: './ticket-cierre-caja.component.html',
  styleUrls: ['./ticket-cierre-caja.component.scss'],
})
export class TicketCierreCajaComponent implements OnInit {
  constructor(public getInfo: GetInfoService) {}

  ngOnInit(): void {
    this.getInfo.getCierreCaja();
  }
}
