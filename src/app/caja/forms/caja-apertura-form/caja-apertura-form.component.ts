import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caja-apertura-form',
  templateUrl: './caja-apertura-form.component.html',
  styleUrls: ['./caja-apertura-form.component.scss']
})
export class CajaAperturaFormComponent implements OnInit {

 
  @Input() fromParent: any;
  usuario?: string
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
    //console.log("on init form", this.fromParent);
    this.titulo = this.fromParent.modo
    this.saldo = this.fromParent.saldo
    this.usuario = this.fromParent.usuario
    console.log( "form init saldo", this.saldo)
    this.selectConfigureForm()
    // {
    //   this.now = new Date()
    //   //console.log("on init form", this.fromParent);
    //   this.titulo = this.fromParent.modo

    //   if (this.titulo === 'Agregar') {
    //     //this.item.id = ""

    //   } else {
    //  //   this.item = this.fromParent.item;
    //     this.configureForm(this.titulo, this.item);
    //   }
    // }
  }

  selectConfigureForm() {
     if (this.titulo === 'Agregar') {
        //this.item.id = ""

      } else {
        //   this.item = this.fromParent.item;
        this.configureForm(this.titulo, this.item);
      }
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
