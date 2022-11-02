import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InterOpService } from '../servicios/inter-op.service';
import { LoggedService } from '../servicios/logged.service';
import { ServicioDatosService } from '../servicios/servicio-datos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'Playa'
  // propiedades logged service
  $estado;

  patenteForm:any
  searchText!: string;

  msgBack(op: string) {
    let value = {
      op: op,
      item: this.patenteForm.value,
    }
    console.log(value);
    
    this.newItemEvent.emit(value);
  }



  constructor(
    private loggedService: LoggedService,  private fb: FormBuilder,
  ) { 
    this.$estado = loggedService.logged$;
    this.patenteForm = this.fb.group({
      patente: ['']        
    });   
  }
  msg: any
  ngOnInit(): void {
  }
}