import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaFacturacion } from 'src/app/interfaces/consulta-facturacion';
import { ConsultaFacturacionService } from 'src/app/servicios/facturacion/consultaFacturacion/consulta-facturacion.service';

@Component({
  selector: 'app-consulta-facturacion',
  templateUrl: './consulta-facturacion.component.html',
  styleUrls: ['./consulta-facturacion.component.scss']
})
export class ConsultaFacturacionComponent implements OnInit {

  //@Input() consultaFacturacion!:any;
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() respuestaFacturacion:any;

  titulo: string ="consultaFecha"
  model1!: any;
	model2!: any;
  time1:any = { hour: "00", minute: "00" };
  time2:any = { hour: "23", minute: "59" };
  fechasConsulta:any = {
    fechaDesde: 0,
    fechaHasta: 0,
  }
  facturacion!:any;
  //consultaFacturacion!:consultaFacturacion
  consultaFacturacion!:any;

	constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private cfService: ConsultaFacturacionService) {}

	get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}

  ngOnInit(): void {
    //console.log(this.consultaFacturacion);   
    console.log(this.facturacion);
    
  }

  buscarFacturacion(){
    /* console.log(this.model1);
    console.log(this.time1);
    
    console.log(this.model2);
    console.log(this.time2);
 */
    this.fechasConsulta.fechaDesde = new Date (this.model1.year, this.model1.month -1, this.model1.day, this.time1.hour, this.time1.minute ).getTime()
    //console.log(this.fechasConsulta.fechaDesde);

    this.fechasConsulta.fechaHasta = new Date (this.model2.year, this.model2.month -1, this.model2.day, this.time2.hour, this.time2.minute ).getTime()
    //console.log(this.fechasConsulta.fechaHasta);
   
    this.titulo = "consulta facturacion";
    this.msgBack(this.titulo, this.fechasConsulta)


    //Esto es cuando se consultaba todos desde este mismo componente
    //this.getFacturacion()
    //this.consultaFacturacion = this.cfService.calcularFacturacion(this.fechasConsulta, this.facturacion);
    //console.log(this.consultaFacturacion);
    //this.ngOnInit()
    

  }
   
  getFacturacion(){
    this.facturacion = JSON.parse(localStorage.getItem("facturacion")||`{}`)
    //console.log(`estas es facturacion: `, this.facturacion);  
  }


  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    }
    //console.log(value);
    
    this.newItemEvent.emit(value);
    //this.ngOnInit();
  }

  


}
