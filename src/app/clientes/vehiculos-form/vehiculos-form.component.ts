import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tarifas } from 'src/app/interfaces/tarifas';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { ServicioDatosService } from 'src/app/servicios/servicio-datos.service';

@Component({
  selector: 'app-vehiculos-form',
  templateUrl: './vehiculos-form.component.html',
  styleUrls: ['./vehiculos-form.component.scss']
})
export class VehiculosFormComponent implements OnInit {

  @Input() item!:any;
  @Output() newItemEvent = new EventEmitter<any>();
  
  vehiculos!: Vehiculo [];
  vehiculosPorCliente: Vehiculo [] =[];
  editForm!:any;
  tarifas!: Tarifas[];
  tarifaSeleccionada!: any;
  titulo!:string;
  componente: string = 'vehiculos'

  

  constructor(private fb: FormBuilder, private servicioDatosService: ServicioDatosService) {
    
   }

  ngOnInit(): void {
    //console.log(this.item);
    this.createForm();
    this.getVehiculos();
    this.getTarifas();   
  }

  getVehiculos(){
    this.servicioDatosService.getAll("vehiculos").subscribe (
      datos => {this.vehiculos = datos;    
        console.log("get all vehiculos",  this.vehiculos)
        localStorage.setItem('vehiculos', JSON.stringify(this.vehiculos));    
        this.armarTabla();
      }      
    );
    
    
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
      patente: [''],
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
    //console.log(this.tarifaSeleccionada);
    
  }

  guardarVehiculo(){
    //console.log(this.editForm.value);
    //console.log(this.item);
    let vehiculoAgregado={
      //id: number;
        patente: this.editForm.value.patente,
        marca: this.editForm.value.marca,
        modelo: this.editForm.value.modelo,
        color: this.editForm.value.color,
        idCliente: this.item.id,
        tarifa: this.tarifaSeleccionada,
        estado: 1,
    }    
    //console.log(vehiculoAgregado);
    this.titulo = "Vehiculo Agregar"
    this.msgBack(this.titulo, vehiculoAgregado)
  }

  eliminarVehiculo(vehiculo: Vehiculo){
    //console.log(vehiculo);
    this.titulo = "Vehiculo Eliminar"
    this.msgBack(this.titulo, vehiculo)
  }

  editarVehiculo(vehiculo: Vehiculo){
    console.log(vehiculo);
    this.editForm.patchValue({
      //id: number;
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
    this.titulo = "Vehiculo Agregar"
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


}
