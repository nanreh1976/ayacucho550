import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarifas } from 'src/app/interfaces/tarifas';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { ValidarPatenteService } from 'src/app/servicios/patentes/validar-patente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vehiculos-form',
  templateUrl: './vehiculos-form.component.html',
  styleUrls: ['./vehiculos-form.component.scss']
})
export class VehiculosFormComponent implements OnInit {

  @Input() item!:any;
  @Output() newItemEvent = new EventEmitter<any>();
  
  //vehiculos!: Vehiculo [];
  vehiculosPorCliente: Vehiculo [] =[];
  editForm!:any;
  tarifas!: Tarifas[];
  tarifaSeleccionada!: any;
  titulo!:string;
  componente: string = 'vehiculos'
  form:boolean = false;
  
  vehiculos: Vehiculo [];

  constructor(private fb: FormBuilder, private dbFirebase: DbFirestoreService, public activeModal: NgbActiveModal, public vpService: ValidarPatenteService) {
    
   }

  ngOnInit(): void {
    console.log(this.item);
    console.log(this.titulo);
    
    this.createForm();
    this.getAllVehiculos();
    this.getTarifas();   
  }

  getAllVehiculos(): void {
  this.dbFirebase.getAll(this.componente).subscribe(data => {
    this.vehiculos = data;
    localStorage.setItem(`${this.componente}`, JSON.stringify(data))
    console.log(this.vehiculos); 
    this.armarTabla()     
  })
}

  getTarifas()  {
    this.tarifas = JSON.parse(localStorage.getItem("tarifas")||`{}`)
    console.log(`estas son las tarifas: ${this.tarifas}`);  
    
  }

  armarTabla(){
    let vehiculos;

    this.vehiculos.forEach(vehiculo => {
       if(vehiculo.idCliente === this.item.id){
        this.vehiculosPorCliente.push(vehiculo);
        //console.log(this.vehiculosPorCliente);
        
      } 
    })
    console.log(this.vehiculosPorCliente);
  }

  createForm() {
    this.editForm = this.fb.group({
      patente: ['',  [Validators.required, Validators.minLength(6), this.vpService.evaluarPatente()]],  
      marca: [''],
      modelo: [''],
      color: [''],
      // egreso: [''],
      // ingreso: [''],
      id: [''],
    });
  }

  changeTarifa(e: any) {
    console.log(e.target.value)    
    let tarifaForm   //crea una variable para usarlo con la funcion filter
  
    tarifaForm = this.tarifas.filter(function(tarifas:any){       //filter recorre el array tarifas y devuelve otro array con lo que sea q coincida con el parametro
      return tarifas.nombre === e.target.value
    })
    
    this.tarifaSeleccionada = tarifaForm[0];               //se guarda el nombre de la tarifa seleccionada en la variable
    console.log(this.tarifaSeleccionada);
    
  }

  setearTitulo(){
    this.titulo = "Vehiculo Agregar"
  }

  guardarVehiculo(){
    console.log(this.editForm.value);
    console.log(this.item);    
    console.log(this.titulo);
    
    if(this.titulo === "Vehiculo Agregar"){
      //this.titulo = "Vehiculo Agregar";
      console.log("pasa por aca?")
      let vehiculoAgregado={
        //id: this.item.id,
        patente: this.editForm.value.patente,
        marca: this.editForm.value.marca,
        modelo: this.editForm.value.modelo,
        color: this.editForm.value.color,
        idCliente: this.item.id,
        tarifa: this.tarifaSeleccionada,
        estado: 1,
      } 
      console.log(vehiculoAgregado);
      
      Swal.fire({
        title: '¿Desea agendar el vehiculo?',
        //text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Agendado',
            //'Your file has been deleted.',
            //'success' 
          )
          this.msgBack(this.titulo, vehiculoAgregado);
        }
      })   
      //console.log(vehiculoAgregado);      
      //this.msgBack(this.titulo, vehiculoAgregado);
    } else {
      let vehiculoEditado={
        id: this.editForm.value.id,
        patente: this.editForm.value.patente,
        marca: this.editForm.value.marca,
        modelo: this.editForm.value.modelo,
        color: this.editForm.value.color,
        idCliente: this.item.id,
        tarifa: this.tarifaSeleccionada,
        estado: 1,
      }
      Swal.fire({
        title: '¿Desea guardar los cambios?',
        //text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
           Swal.fire(
            'Guardados',
            //'Your file has been deleted.',
            //success' 
          )
          this.msgBack(this.titulo, vehiculoEditado);
        }
      })   
      //this.msgBack(this.titulo, vehiculoEditado);

    }
    
   
  }

  eliminarVehiculo(vehiculo: Vehiculo){
    //console.log(vehiculo);
    this.titulo = "Vehiculo Eliminar";
    Swal.fire({
      title: '¿Desea eliminar el vehículo?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
       Swal.fire(
          'Eliminado',
          //'Your file has been deleted.',
          //'success' 
        )
        this.msgBack(this.titulo, vehiculo);
      }
    })
    //this.msgBack(this.titulo, vehiculo)
  }

  editarVehiculo(vehiculo: Vehiculo){
    console.log(vehiculo);
    this.editForm.patchValue({
        id: vehiculo.id,
        patente: vehiculo.patente,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        color: vehiculo.color,
        idCliente: vehiculo.idCliente, 
        tarifa: vehiculo.tarifa.nombre,
        estado: 1,
    });    
    //console.log(vehiculoAgregado);
    this.tarifaSeleccionada = vehiculo.tarifa
    this.titulo = "Vehiculo Editar"
    //this.msgBack(this.titulo, vehiculoEditado)
  }

  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    }
    this.newItemEvent.emit(value);
    console.log(value);
    
  }

  get Patente(){
    return this.editForm.get("patente"); 
  }

  toggle() {
    this.form = !this.form;
    //console.log(this.form);    
  }


}
