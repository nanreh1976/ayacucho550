import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintElementService } from 'ngx-print-element';



@Component({
  selector: 'app-caja-cierre-form',
  templateUrl: './caja-cierre-form.component.html',
  styleUrls: ['./caja-cierre-form.component.scss'],
})
export class CajaCierreFormComponent implements OnInit {
  @Input() fromParent: any;

  editForm!: any;

  item: any;
  now!: Date;



  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public print: NgxPrintElementService,
  ) {
    this.createForm();

  }

  ngOnInit(): void {

    this.now = new Date();
    this.configureForm( this.item);

  }

 
  configureForm( item: any) {
    this.editForm.patchValue({
      fecha: this.now,
      concepto: '',
      operacion: 'Cierre de Caja',
    });
  }

  createForm() {
    this.editForm = this.fb.group({
      concepto: ['', Validators.pattern('[a-zA-Z0-9 ñÑáéíóúÁÉÍÓÚ]*')],
      importe: [Validators.required, Validators.pattern('-?\\d+(?:\\.\\d+)?')],
      operacion: [''],
      fecha: [''],
    });
  }

  enviarInfo() {
    let value = {
      op: this.fromParent.modo,
      item: this.editForm.value,
    };
    this.activeModal.close(value);
  }

  get Importe() {
    return this.editForm.get('importe');
  }

  get Concepto() {
    return this.editForm.get('concepto');
  }


}
