import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caja-egreso-form',
  templateUrl: './caja-egreso-form.component.html',
  styleUrls: ['./caja-egreso-form.component.scss']
})
export class CajaEgresoFormComponent implements OnInit {


  @Input() fromParent: any;
  editForm!: any;
  titulo!: string;
  item: any;
  now!: Date
  saldo!: number

  constructor(public activeModal: NgbActiveModal,

    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.now = new Date()
    this.titulo = this.fromParent.modo
    this.saldo = this.fromParent.saldo
    this.configureForm(this.titulo, this.item)
  }

  configureForm(_titulo: string, item: any) {

    // console.log("configure form", titulo, item), (titulo !=='agregar');
    this.editForm.patchValue({

      fecha: this.now,
      concepto: "",
      operacion: "",
      importe: "",
      // id:""
    });

  }


  createForm() {
    this.editForm = this.fb.group({
      concepto: ['',  
                Validators.required,
                Validators.minLength(4),], 
      importe: [''], //, Validators.required, Validators.pattern("-?\\d+(?:\\.\\d+)?"),
    //Validators.max(this.saldo), Validators.min(1),],
      operacion: [''],
      fecha: ['',],
      //id: [''],

    });
  }


  closeModal() {
    let value = {
      op: this.titulo,
      item: this.editForm.value
    };
    this.activeModal.close(value);
  }



  get Importe() {
    return this.editForm.get("importe");
  }

  get Concepto() {
    return this.editForm.get("concepto");
  }



  getMsg(msg: any) {
    this.activeModal.close(msg);
  }

}
