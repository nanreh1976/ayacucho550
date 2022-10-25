import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tarifas-form',
  templateUrl: './tarifas-form.component.html',
  styleUrls: ['./tarifas-form.component.scss']
})
export class TarifasFormComponent implements OnInit {



  @Input() fromParent : any;
  editForm!: any;
  titulo!: any;
  item!: any


  constructor(public activeModal: NgbActiveModal,
    
    private fb: FormBuilder,
    ) { 
      this.createForm();
    }





    ngOnInit(): void {
      {
        // console.log("on init form", this.fromParent);
        this.titulo = this.fromParent.modo
        this.item = this.fromParent.item;
        if(this.item.op === 'Agregar'){ delete this.item.id_experiencia}
        this.configureForm(this.titulo, this.item);
  
      }
    }
  
    
  
  
  
    configureForm(titulo: string, item: any) {
  
      // console.log("configure form", titulo, item), (titulo !=='agregar');
      this.editForm.patchValue({
        
        nombre: item.nombre,
        unidad_tiempo: item.unidad_tiempo,
        valor: item.valor,
        fraccion: item.fraccion,
        ut_fraccion: item.ut_fraccion,
         descuento: item.descuento,
      });
  
    }
  
  
    createForm() {
      this.editForm = this.fb.group({
        nombre: [''],
        unidad_tiempo: [''],
        valor: [''],
        fraccion: [''],
        ut_fraccion: [''],
        descuento: [''],
      });
    }
  
  
  
    closeModal() {
      let value = {
     op: this.titulo,
     item: this.editForm.value
     
   };
  
  //  console.log("closemodal", value)
   this.activeModal.close(value);
  
  }
}
