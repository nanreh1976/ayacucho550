import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  patronPatente:any = {
    patentesViejas : /^[a-zA-Z]{3}[\d]{3}$/,
    patentesNuevas : /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/,
    patentesMotosViejas : /^[0-9]{3}[a-zA-Z]{3}$/,
    patentesMotosNuevas : /^[a-zA-Z]{1}[0-9]{3}[a-zA-Z]{3}$/,
    
  }  
  patenteForm:any
  searchText!: string;
  msg: any

  constructor(
    private loggedService: LoggedService,  private fb: FormBuilder,
  ) { 
    this.$estado = loggedService.logged$;
    this.patenteForm = this.fb.group({
      patente: ['',  [Validators.required, Validators.pattern(this.patronPatente.patentesViejas||this.patronPatente.patentesNuevas||this.patronPatente.patentesMotosViejas||this.patronPatente.patentesMotosNuevas)]]        
    });   
  }
  
  msgBack(op: string) {
    console.log(this.patenteForm.value.patente);
      let value = {
        op: op,
        item: this.patenteForm.value,
      }
      //console.log(value);
      this.newItemEvent.emit(value);      
    this.patenteForm.reset(); 
  }


  ngOnInit(): void {
  }

  get Patente(){
    return this.patenteForm.get("patente")
  }

}