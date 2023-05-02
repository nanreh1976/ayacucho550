import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap, catchError, of } from 'rxjs';
import { Tarifas } from 'src/app/interfaces/tarifas';
import { ValidarPatenteService } from 'src/app/servicios/patentes/validar-patente.service';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.scss'],
})
export class EditarVehiculoComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string;
  @Input() vehiculoParaEditar!: any;
  @Output() closed = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

  editForm: any;
  tarifas!: Tarifas[];
  tarifaSeleccionada!: any;
  vehiculosClientes: any;

  ngOnInit(): void {
    this.getTarifas();
    this.createEditarVehiculoForm();
   // console.log(this.vehiculoParaEditar);
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

  createEditarVehiculoForm() {
    this.editForm = this.fb.group({
      patente: [
        '',
        [Validators.required, this.vpService.evaluarFormatoPatente()],
      ],
      marca: [''],
      modelo: [''],
      color: [''],
      tarifa: ['', Validators.required],
      id: [''],        
      estado: [''],
      abonoInicio: [''],
      abonoFin: [''],
      idCliente: [''],
    });

    if (this.vehiculoParaEditar) {
      this.editForm.patchValue({
        id: this.vehiculoParaEditar.id,
        patente: this.vehiculoParaEditar.patente,
        marca: this.vehiculoParaEditar.marca,
        modelo: this.vehiculoParaEditar.modelo,
        color: this.vehiculoParaEditar.color,
        idCliente: this.vehiculoParaEditar.idCliente,
        tarifa: this.vehiculoParaEditar.tarifa.nombre,
        estado: this.vehiculoParaEditar.estado,
        abonoInicio: this.vehiculoParaEditar.abonoInicio,
        abonoFin: this.vehiculoParaEditar.abonoFin,
      });
    }
  }

  changeTarifa(event: any) {
    const selectedTarifa = this.tarifas.find((tarifa: any) => {
      return tarifa.nombre === event.target.value;
    });
    this.tarifaSeleccionada = selectedTarifa;
  }

  onSubmit() {
   // console.log(this.editForm.value);
    this.formSubmit.emit(this.editForm.value); // emit event with form value
  }
}
