import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintElementService } from 'ngx-print-element';
import { GetInfoService } from 'src/app/servicios/get-info/get-info.service';


@Component({
  selector: 'app-caja-cierre-form',
  templateUrl: './caja-cierre-form.component.html',
  styleUrls: ['./caja-cierre-form.component.scss'],
})
export class CajaCierreFormComponent implements OnInit {
  @Input() fromParent: any;

  editForm!: any;
  titulo!: string;
  item: any;
  now!: Date;
  saldo!: number;


  constructor(
    public activeModal: NgbActiveModal,
    public getInfo:GetInfoService,
    private fb: FormBuilder,
    public print: NgxPrintElementService,
  ) {
    this.createForm();

  }

  ngOnInit(): void {
    this.getInfo.getCierreCaja()
    this.now = new Date();
    this.titulo = this.fromParent.modo;
    this.saldo = this.fromParent.saldo;
    this.configureForm(this.titulo, this.item);

  }

 
  configureForm(_titulo: string, item: any) {
    this.editForm.patchValue({
      fecha: this.now,
      concepto: '',
      operacion: 'Cierre de Caja',
      importe: this.saldo,
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
      op: this.titulo,
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
