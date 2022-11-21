import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InterOpService } from '../servicios/inter-op.service';

import { ValidarPatenteService } from '../servicios/patentes/validar-patente.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'Playa'
  
 /*  patronPatente:any = {
    patentesViejas : /^[a-zA-Z]{3}[\d]{3}$/,
    patentesNuevas : /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/,
    patentesMotosViejas : /^[0-9]{3}[a-zA-Z]{3}$/,
    patentesMotosNuevas : /^[a-zA-Z]{1}[0-9]{3}[a-zA-Z]{3}$/,
    
  }   */
  patenteForm:any
  searchText!: string;
  msg: any

  constructor(
    private fb: FormBuilder, public vpService: ValidarPatenteService
  ) {    
    this.patenteForm = this.fb.group({
      /* patente: ['',  [Validators.required, Validators.pattern(this.patronPatente.patentesViejas||this.patronPatente.patentesNuevas||this.patronPatente.patentesMotosViejas||this.patronPatente.patentesMotosNuevas)]]         */
      patente: ['',  [Validators.required, Validators.minLength(6), vpService.evaluarPatente()]]        
    });   
  }
  
  msgBack(op: string, patente: string) {    
      let value = {
        op: op,
        item: this.patenteForm.value,
      }
      console.log("aca emite el msj con el valor ", value);
      this.newItemEvent.emit(value);      
      this.patenteForm.reset(); 
  }


  ngOnInit(): void {
   
    
  }

  get Patente(){
    return this.patenteForm.get("patente")
  }

  onSubmit(){   
    
    if(this.patenteForm.valid){
      this.msgBack(this.titulo, this.patenteForm.value.patente);
      }else {
        console.log("form is invalid")
        }
    
  }

  setTitulo(titulo: string){
    this.titulo = titulo;  
  }

}