import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caja-cierre-form',
  templateUrl: './caja-cierre-form.component.html',
  styleUrls: ['./caja-cierre-form.component.scss']
})
export class CajaCierreFormComponent implements OnInit {

  
  @Input() fromParent: any;
  usuario!: string
  editForm!: any;
  titulo!: string;
  item: any;
  now!: Date
  saldo!: number

  setUser() {
    let user = JSON.parse(localStorage.getItem("user") || `{}`)
    this.usuario = (user['displayName'])
  }


  constructor(public activeModal: NgbActiveModal,

    private fb: FormBuilder,
  ) {
    this.createForm();
  }



  ngOnInit(): void {
    this.now = new Date()
    //console.log("on init form", this.fromParent);
    this.titulo = this.fromParent.modo
    this.saldo = this.fromParent.saldo

    this.configureForm(this.titulo, this.item);
  }

  configureForm(_titulo: string, item: any) {

    // console.log("configure form", titulo, item), (titulo !=='agregar');
    this.editForm.patchValue({

      fecha: this.now,
      concepto: "",
      operacion: "Cierre de Caja",
      importe: this.saldo,
      // id:""
    });

  }


  createForm() {
    this.editForm = this.fb.group({
      concepto: ['', Validators.pattern('[a-zA-Z0-9 ñÑáéíóúÁÉÍÓÚ]*')],
      importe: [Validators.required,
      Validators.pattern("-?\\d+(?:\\.\\d+)?")

      ],
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
    //console.log("closemodal", value)
    this.activeModal.close(value);
  }



  get Importe() {
    return this.editForm.get("importe");
  }

  get Concepto() {
    return this.editForm.get("concepto");
  }



  getMsg(msg: any) {

    /* let value = {
      op: msg.op,
      item: msg.item
      
    }; */

    //console.log("closemodal", msg)
    this.activeModal.close(msg);

  }




}
