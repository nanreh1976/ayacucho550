import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caja-ingreso-form',
  templateUrl: './caja-ingreso-form.component.html',
  styleUrls: ['./caja-ingreso-form.component.scss']
})
export class CajaIngresoFormComponent implements OnInit {

 
  @Input() fromParent: any;
  @Input() usuario?: any
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
    // console.log( "form init saldo", this.saldo)
    this.selectConfigureForm()

  }

  selectConfigureForm() {
     if (this.titulo === 'Agregar') {

      } else {
        //   this.item = this.fromParent.item;
        this.configureForm(this.titulo, this.item);
      }
    }

  

  configureForm(_titulo: string, item: any) {
    this.editForm.patchValue({

      fecha: this.now,
      concepto: "",
      operacion: "",
      importe: "",

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
