import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, } from '@angular/forms';
import { ServicioDatosService } from 'src/app/servicios/servicio-datos.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss']
})
export class ClientesFormComponent implements OnInit {

  @Input() fromParent: any;
  editForm!: any;
  titulo!: string;
  item!: any;


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
      if(this.item.op === 'Agregar'){ delete this.item.id}
      this.configureForm(this.titulo, this.item);

    }
  }

  



  configureForm(titulo: string, item: any) {

    // console.log("configure form", titulo, item), (titulo !=='agregar');
    this.editForm.patchValue({
      
      apellido: item .apellido,
      nombre: item .nombre,
      telefono: item .telefono,
      direccion: item.direccion,
      comentario: item .comentario,
      email: item.email,
      id: item.id,
    });

  }


  createForm() {
    this.editForm = this.fb.group({
      apellido: [''],
      nombre: [''],
      telefono: [''],
      direccion: [''],
      comentario: [''],
      email: ['', [Validators.required, Validators.email]],
      id: [''],
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

get Email(){
  return this.editForm.get("email"); 
}

getMsg(msg: any) {
  console.log(msg, "from vehiculos-form");
  /* let value = {
    op: msg.op,
    item: msg.item
    
  }; */
 
  console.log("closemodal", msg)
  this.activeModal.close(msg);
  
}

  
}
