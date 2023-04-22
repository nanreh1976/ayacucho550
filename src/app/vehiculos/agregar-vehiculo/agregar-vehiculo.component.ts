import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { Tarifas } from 'src/app/interfaces/tarifas';
import { ValidarPatenteService } from 'src/app/servicios/patentes/validar-patente.service';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.scss'],
})
export class AgregarVehiculoComponent implements OnInit {
  editForm: any;
  tarifas!: Tarifas[];
  tarifaSeleccionada!: any;

  ngOnInit(): void {
    this.getTarifas();
    this.createAgregarVehiculoForm();
  }
  @Input() title!: string;
  @Input() message!: string;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
  constructor(
    private storageService: StorageService,
    public vpService: ValidarPatenteService,
    private fb: FormBuilder
  ) {}

  getTarifas() {
    this.storageService.tarifas$.subscribe(
      (data) => {
        this.tarifas = data || []; // set a default value if data is undefined or empty
      },
      (error) => {
        console.error('Error getting tarifas:', error);
        this.tarifas = []; // set a default value if an error occurs
      }
    );
  }

  createAgregarVehiculoForm() {
    this.editForm = this.fb.group({
      patente: [
        '',
        [Validators.required, 
          this.vpService.evaluarFormatoPatente(),
 
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
  }

  onSubmit() {
    console.log(this.editForm.value);
  }
}
