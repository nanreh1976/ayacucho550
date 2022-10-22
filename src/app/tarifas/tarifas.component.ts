import { Component, OnInit } from '@angular/core';
import { ServicioDatosService } from '../servicios/servicio-datos.service';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss']
})
export class TarifasComponent implements OnInit {

  tarifas:any;

  constructor(private servicioDatosService: ServicioDatosService) { }

  ngOnInit(): void {
    this.getTarifas(); 
  }

  getTarifas(): void {
    this.servicioDatosService.getTarifas().subscribe(tarifas => {
      this.tarifas = tarifas;
    });
  }

  

}
