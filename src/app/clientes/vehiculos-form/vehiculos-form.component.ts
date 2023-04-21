import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarifas } from 'src/app/interfaces/tarifas';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { AbonoService } from 'src/app/servicios/abono/abono.service';
import { EstadoCajaService } from 'src/app/servicios/caja/estado-caja.service';
import { ValidarPatenteService } from 'src/app/servicios/patentes/validar-patente.service';
import { StorageService } from 'src/app/servicios/storage/storage.service';
import { VehiculosStorageService } from 'src/app/servicios/storage/vehiculos-storage.service';
import Swal from 'sweetalert2';
import { PagoAbonoComponent } from '../pago-abono/pago-abono.component';

@Component({
  selector: 'app-vehiculos-form',
  templateUrl: './vehiculos-form.component.html',
  styleUrls: ['./vehiculos-form.component.scss'],
})
export class VehiculosFormComponent implements OnInit {
  @Input() item!: any;
  @Output() newItemEvent = new EventEmitter<any>();

  //vehiculos!: Vehiculo [];
  vehiculosPorCliente: Vehiculo[] = [];
  editForm!: any;
  tarifas!: Tarifas[];
  tarifaSeleccionada!: any;
  titulo!: string;
  componente: string = 'vehiculos';
  form: boolean = false;
  itemVehiculo: Vehiculo;
  vehiculos: any[];
  $modoCaja: any;
  vehiculoExistente = false;

  constructor(
    private fb: FormBuilder,
    private vehiculosStorage: VehiculosStorageService,
    public activeModal: NgbActiveModal,
    public vpService: ValidarPatenteService,
    private modalService: NgbModal,

    private abonoService: AbonoService,
    private storageService: StorageService,
    private estadoCaja: EstadoCajaService
  ) {}

  ngOnInit(): void {
    this.$modoCaja = this.estadoCaja.getModoCaja();
    this.createForm();
    this.getAllVehiculos();
    this.getTarifas();
  }

  getAllVehiculos(): void {
    this.vehiculosStorage.data$.subscribe((data) => (this.vehiculos = data));
    this.armarTabla();
  }

  getTarifas() {
    this.storageService.tarifas$.subscribe((data) => (this.tarifas = data));
  }

  armarTabla() {
    this.vehiculosPorCliente = this.vehiculos.filter(
      (vehiculo) => vehiculo.idCliente === this.item.id
    );
  }

  createForm() {
    this.editForm = this.fb.group({
      patente: ['', Validators.required],
      marca: [''],
      modelo: [''],
      color: [''],
      id: [''],
    });
  }

  changeTarifa(e: any) {
    //console.log(e.target.value)
    let tarifaForm; //crea una variable para usarlo con la funcion filter

    tarifaForm = this.tarifas.filter(function (tarifas: any) {
      //filter recorre el array tarifas y devuelve otro array con lo que sea q coincida con el parametro
      return tarifas.nombre === e.target.value;
    });

    this.tarifaSeleccionada = tarifaForm[0]; //se guarda el nombre de la tarifa seleccionada en la variable
    // console.log(this.tarifaSeleccionada);
  }

  agregarVehiculo() {
    this.toggleFormView();
    this.titulo = 'Vehiculo Agregar';
    this.editForm.reset({
      patente: '',
      marca: '',
      modelo: '',
      color: '',
      idCliente: '',
      tarifa: '',
      estado: '',
    });
    this.editForm.get('patente')?.enable(); // Habilitar el control del formulario patente
  }

  // se agrega o se edita el vehiculo
  guardarVehiculo() {
    if (this.titulo === 'Vehiculo Agregar') {
      this.agregarVehiculoAlCliente();
    } else {
      this.guardarVehiculoEditado();
    }
  }

  guardarVehiculoEditado() {
    let vehiculoEditado = {
      id: this.editForm.value.id,
      patente: this.editForm.value.patente,
      marca: this.editForm.value.marca,
      modelo: this.editForm.value.modelo,
      color: this.editForm.value.color,
      idCliente: this.item.id,
      tarifa: this.tarifaSeleccionada,
      abonoInicio: this.itemVehiculo.abonoInicio,
      abonoFin: this.itemVehiculo.abonoFin,
      estado: this.itemVehiculo.estado,
    };
    Swal.fire({
      title: '¿Desea guardar los cambios?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Guardados');
        this.msgBack(this.titulo, vehiculoEditado);
      }
    });
  }

  eliminarVehiculo(vehiculo: Vehiculo) {
    //console.log(vehiculo);
    this.titulo = 'Vehiculo Eliminar';
    Swal.fire({
      title: '¿Desea eliminar el vehículo?',
      text: 'No podrá revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado');
        this.msgBack(this.titulo, vehiculo);
      }
    });
  }

  agregarVehiculoAlCliente() {
    let vehiculoAgregado = {
      //id: this.item.id,
      patente: this.editForm.value.patente,
      marca: this.editForm.value.marca,
      modelo: this.editForm.value.modelo,
      color: this.editForm.value.color,
      idCliente: this.item.id,
      tarifa: this.tarifaSeleccionada,
      abonoInicio: null,
      abonoFin: null,
      estado: 0,
    };
    //console.log(vehiculoAgregado);

    Swal.fire({
      title: '¿Desea agendar el vehiculo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Agendado');
        this.msgBack(this.titulo, vehiculoAgregado);
      }
    });
  }

  editarVehiculo(vehiculo: Vehiculo) {
    this.toggleFormView();
    this.itemVehiculo = vehiculo;
    this.tarifaSeleccionada = vehiculo.tarifa;
    this.titulo = 'Vehiculo Editar';
    this.editForm.patchValue({
      id: vehiculo.id,
      patente: vehiculo.patente,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      color: vehiculo.color,
      idCliente: vehiculo.idCliente,
      tarifa: vehiculo.tarifa.nombre,
      estado: vehiculo.estado,
    });
  }
  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    };
    this.newItemEvent.emit(value);

  }

  get Patente() {
    return this.editForm.get('patente');
  }

  toggleFormView() {
    this.form = !this.form;
  }

  efectuarPago(vehiculo: Vehiculo) {
    const modalRef = this.modalService.open(PagoAbonoComponent, {
      windowClass: 'myCustomModalClass',
    });

    let info = {
      modo: 'Agregar',
      item: vehiculo,
      cliente: this.item,
    };

    modalRef.componentInstance.fromParent = info;
    modalRef.result.then(
      (result) => {
        this.abonoService.pagarAbonoVehiculo(vehiculo, result);
        this.msgBack(this.titulo, vehiculo);
      },
      (reason) => {}
    );
  }
}
