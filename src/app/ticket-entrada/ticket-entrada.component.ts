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


  
  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['td { border: 1px solid black; color: green; }', 'table { border: 1px solid black; color: red }', 'header, table, footer { margin: auto; text-align: center; }']
  }

  
}
