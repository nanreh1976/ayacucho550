import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintElementService } from 'ngx-print-element';
import { EstadiaService } from '../servicios/facturacion/estadia.service';
import { CalculoFechasService } from '../servicios/Fechas/calculo-fechas.service';

@Component({
  selector: 'app-ticket-entrada',
  templateUrl: './ticket-entrada.component.html',
  styleUrls: ['./ticket-entrada.component.scss']
})
export class TicketEntradaComponent implements OnInit {

  @Input() fromParent: any;  
  item!: any    
  fechaIngreso!:string;
  horaIngreso!:string;
  fechaSalida!:string;
  horaSalida!:string;
  patente!: string;
  modo!: string;
  saldo!:number;
  estadia!: number;
  estadiaHoras:any = ""

  tarifaFraccion!:number;
  tarifaValor!:number; 


  constructor(public print: NgxPrintElementService, public activeModal: NgbActiveModal, private fechaService: CalculoFechasService, private estadiaService :EstadiaService) {}

  ngOnInit(): void {
    // console.log("on init form", this.fromParent);
    this.modo = this.fromParent.modo
    this.item = this.fromParent.item;    

    this.ticket();

    if(this.modo === "Ticket Salida"){
      this.tiempoEstadia();
      //this.saldoEstadia();
    }

  }
  
  format = 'CODE128B';
  value = ``;
  width = .8;
  height = 100;
  displayValue = true;
  fontSize = 15;


  /////// estas son los atributos con los que se pueden configurar ngx-barcode6
  /* elementType = "svg";
  value = "241022000001";
  format = "CODE128B";
  lineColor = "#000000";
  width = 1.5;
  height = 100;
  displayValue = true;
  fontOptions = "";
  font = "monospace";
  textAlign = "center";
  textPosition = "bottom";
  textMargin = 2;
  fontSize = 20;
  background = "#ffffff";
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;
  get values(): string[] {
    return this.value.split("\n");
  }

*/
  
  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['td { border: 1px solid black; color: green; }', 'table { border: 1px solid black; color: red }', 'header, table, footer { margin: auto; text-align: center; }']
  }


  ticket(){
    this.fechaIngreso =  this.item.fechas.fechaIngreso;
    this.horaIngreso = this.item.fechas.horaIngreso;
    this.fechaSalida =  this.item.fechas.fechaSalida;
    this.horaSalida = this.item.fechas.horaSalida;
    this.patente = this.item.patente;
    this.estadia = this.item.fechas.estadia;
    this.tarifaFraccion = this.item.tarifa.fraccion;

    this.tarifaValor = this.item.tarifa.valor;
    this.saldo = this.item.saldo;
    this.value = this.item.codigoBarras;
    
  }

  closeModal() {   
    this.activeModal.close();
 } 

  tiempoEstadia(){    
    this.estadiaHoras = this.fechaService.tiempoEstadia(this.estadia);
 }

  /* saldoEstadia( ){ 
    this.saldo = this.estadiaService.saldoEstadia(this.item.tarifa, this.estadia )
  } 
 */
  
}
