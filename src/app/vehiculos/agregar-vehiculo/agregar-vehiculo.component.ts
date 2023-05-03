import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, catchError, of } from 'rxjs';

import { Tarifas } from 'src/app/interfaces/tarifas';
import { ValidarPatenteService } from 'src/app/servicios/patentes/validar-patente.service';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.scss'],
})
export class AgregarVehiculoComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string;
  @Output() closed = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

  
  editForm: any;
  tarifas!: Tarifas[];
  tarifaSeleccionada!: any;
  vehiculosClientes: any;

  ngOnInit(): void {
    this.getTarifas();
    this.createAgregarVehiculoForm();
  }
  constructor(
    private storageService: StorageService,
    public vpService: ValidarPatenteService,
    private fb: FormBuilder
  ) {}

  close(): void {
    this.closed.emit();
  }

  getTarifas() {
    this.storageService.tarifas$
      .pipe(
        tap((data) => {
          this.tarifas = data || [];
        }),
        catchError((error) => {
          console.error('Error getting tarifas:', error);
          this.tarifas = [];
          return of(null);
        })
      )
      .subscribe();
  }

  createAgregarVehiculoForm() {
    this.editForm = this.fb.group({
      patente: [
        '',
        [
          Validators.required,
          this.vpService.evaluarFormatoPatente(),
          this.vpService.patenteExistsInVehiculosValidator(), 
        ],
      ],
      marca: [''],
      modelo: [''],
      color: [''],
      tarifa: ['', Validators.required],
      id: [''],
    });
  }

  changeTarifa(event: any) {
    const selectedTarifa = this.tarifas.find((tarifa: any) => {
      return tarifa.nombre === event.target.value;
    });
    this.tarifaSeleccionada = selectedTarifa;
    console.log("tarifa seleccionada", this.tarifaSeleccionada)
  }

  // onSubmit() {
  //  // console.log(this.editForm.value);
  //   this.formSubmit.emit(this.editForm.value); // emit event with form value
  // }

  onSubmit() {


    if (this.editForm.invalid) {
      return;
    }
  
    const formValue = {
      ...this.editForm.value,
      tarifa: this.tarifaSeleccionada, // Agregar la tarifa seleccionada al objeto del formulario
    };
  
    this.formSubmit.emit(formValue); // emit event with updated form value
  }
  
}
