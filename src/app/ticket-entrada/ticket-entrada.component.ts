import { Component, OnInit } from '@angular/core';
import { NgxPrintElementService } from 'ngx-print-element';

@Component({
  selector: 'app-ticket-entrada',
  templateUrl: './ticket-entrada.component.html',
  styleUrls: ['./ticket-entrada.component.scss']
})
export class TicketEntradaComponent implements OnInit {

  constructor(public print: NgxPrintElementService) {}

  ngOnInit(): void {
  }
  
  format = 'MSI';
  value = "24102022000001";
  width = 1.5;
  height = 100;
  displayValue = true;


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

  
}
