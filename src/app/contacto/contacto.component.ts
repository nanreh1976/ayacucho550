import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  model: any = {};
  
  constructor(
    private http: HttpClient
  ){}

  ngOnInit() {
     }
     onSubmit(nombre: any, asunto: any, mail: any, mensaje: any) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post('https://formspree.io/f/xjvldyjw',
        
        
          { name: nombre, subject: asunto, replyto: mail, message: mensaje },
          { 'headers': headers }).subscribe(
            response => {
              console.log(response);
            }
          );
      }  
}