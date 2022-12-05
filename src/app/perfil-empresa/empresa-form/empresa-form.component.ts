import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss']
})
export class EmpresaFormComponent implements OnInit {

  @Input() fromParent: any;
  editForm!: any;
  titulo!: string;
  item: any;


  constructor(public activeModal: NgbActiveModal,

    private fb: FormBuilder,
  ) {
    this.createForm();
  }


  ngOnInit(): void {
    {
      console.log("on init form", this.fromParent);
      this.titulo = this.fromParent.modo

      if (this.titulo === 'Agregar') {
        //this.item.id = ""
      } else {
        this.item = this.fromParent.item;
        this.configureForm(this.titulo, this.item);
      }
    }
  }

  configureForm(_titulo: string, item: any) {

    // console.log("configure form", titulo, item), (titulo !=='agregar');
    this.editForm.patchValue({

      cuit: item.cuit,
      direccion: item.direccion,
      mail: item.mail,
      razonSocial: item.razonSocial,
      telefono: item.telefono,
      id: item.id,
    });

  }


  createForm() {
    this.editForm = this.fb.group({
      cuit: [''],
      direccion: [''],
      mail: [''],
      razonSocial: [''],
      Telefono: [''],
      id: [''],
    });
  }



  closeModal() {

    let value = {
      op: this.titulo,
      item: this.editForm.value

    };

    console.log("closemodal", value)
    this.activeModal.close(value);

  }

  get Email() {
    return this.editForm.get("email");
  }

  get Telefono() {
    return this.editForm.get("telefono");
  }

  get Nombre() {
    return this.editForm.get("nombre");
  }

  get Apellido() {
    return this.editForm.get("apellido");
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
