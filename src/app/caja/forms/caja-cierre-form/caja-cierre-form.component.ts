import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-caja-cierre-form',
  templateUrl: './caja-cierre-form.component.html',
  styleUrls: ['./caja-cierre-form.component.scss'],
})
export class CajaCierreFormComponent implements OnInit {
  @Input() fromParent: any;
  usuario!: string;
  user$: any;
  editForm!: any;
  titulo!: string;
  item: any;
  now!: Date;
  saldo!: number;

  constructor(
    public activeModal: NgbActiveModal,
    private storageService: StorageService,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.setUser();
  }

  ngOnInit(): void {
    this.now = new Date();
    this.titulo = this.fromParent.modo;
    this.saldo = this.fromParent.saldo;
    // console.log('caja cierre form', this.fromParent);
    this.configureForm(this.titulo, this.item);
  }

  setUser() {
    this.storageService.usuario$.subscribe((data) => (this.user$ = data));
    this.usuario = this.user$['displayName'];
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

  closeModal() {
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

  getMsg(msg: any) {
    this.activeModal.close(msg);
  }
}
