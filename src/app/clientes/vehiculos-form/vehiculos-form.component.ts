import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Tarifas } from 'src/app/interfaces/tarifas';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { AbonoService } from 'src/app/servicios/abono/abono.service';
import { InterOpService } from 'src/app/servicios/inter-op.service';
import { ValidarPatenteService } from 'src/app/servicios/patentes/validar-patente.service';
import { VehiculosStorageService } from 'src/app/servicios/storage/vehiculos-storage.service';
// import { StorageService } from 'src/app/servicios/storage.service';
import Swal from 'sweetalert2';
import { PagoAbonoComponent } from '../pago-abono/pago-abono.component';


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
  itemVehiculo: Vehiculo;
  vehiculos: any[] | Observable<any>;

  constructor(private fb: FormBuilder, 
    private vehiculosStorage:VehiculosStorageService,
    // private storageService:StorageService,
    public activeModal: NgbActiveModal, 
    public vpService: ValidarPatenteService,  
    private interOpService: InterOpService, 
    private modalService: NgbModal, 
    private abonoService: AbonoService) {
    
   }

  ngOnInit(): void {
    console.log("componente vehiculo. item: ",this.item);
    //console.log(this.titulo);
    
    this.createForm();
    this.getAllVehiculos();
    this.getTarifas();   
  }

  getAllVehiculos(): void {

    this.vehiculos = this.vehiculosStorage.data$;

    //console.log(this.vehiculos); 
    this.armarTabla()     
  
}

  getTarifas()  {
    this.tarifas = JSON.parse(localStorage.getItem("tarifas")||`{}`)
    //console.log(`estas son las tarifas: ${this.tarifas}`);  
    
  }

  armarTabla(){
    let vehiculos;

    this.vehiculos.forEach(vehiculo => {
       if(vehiculo.idCliente === this.item.id){
        this.vehiculosPorCliente.push(vehiculo);
        //console.log(this.vehiculosPorCliente);
        
      } 
    })
    //console.log(this.vehiculosPorCliente);
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
    //console.log(e.target.value)    
    let tarifaForm   //crea una variable para usarlo con la funcion filter
  
    tarifaForm = this.tarifas.filter(function(tarifas:any){       //filter recorre el array tarifas y devuelve otro array con lo que sea q coincida con el parametro
      return tarifas.nombre === e.target.value
    })
    
    this.tarifaSeleccionada = tarifaForm[0];               //se guarda el nombre de la tarifa seleccionada en la variable
   // console.log(this.tarifaSeleccionada);
    
  }

  setearTitulo(){
    this.titulo = "Vehiculo Agregar"
  }

  guardarVehiculo(){
   // console.log(this.editForm.value);
   // console.log(this.item);    
   // console.log(this.titulo);
    
    if(this.titulo === "Vehiculo Agregar"){
      //this.titulo = "Vehiculo Agregar";
      
      let vehiculoAgregado={
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
      } 
      //console.log(vehiculoAgregado);
      
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
        abonoInicio: this.itemVehiculo.abonoInicio,
        abonoFin: this.itemVehiculo.abonoFin,
        estado: this.itemVehiculo.estado,
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
    //console.log(vehiculo);
    this.itemVehiculo = vehiculo;
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
   // console.log(value);
    
  }

  get Patente(){
    return this.editForm.get("patente"); 
  }

  toggle() {
    this.form = !this.form;
    //console.log(this.form);    
  }

  efectuarPago(vehiculo: Vehiculo) {
    //console.log("esto es el pago del abono: ", vehiculo);
    const modalRef = this.modalService.open(PagoAbonoComponent,
      {
        // scrollable: false,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      })

      let info = {
        modo: "Agregar",
        item: vehiculo,
        cliente: this.item

      }


      modalRef.componentInstance.fromParent = info;
      modalRef.result.then((result) => {
      //console.log("result from control","op", result);

      this.cambiarEstadoAbono(vehiculo);
      this.fechasAbono(vehiculo);
      



      let ndate = new Date()
      this.interOpService.addItem("caja", {
        "concepto": result.item.patente,
        "fecha": ndate ,// item.fechas["fechaSalidaDate"],
        "importe": result.item.tarifa.valor,
        "operacion": "ingreso"
      });

      this.msgBack(this.titulo, vehiculo);

        
    }, (reason) => { });
  }

  cambiarEstadoAbono(vehiculo:Vehiculo){
    vehiculo.estado=1
    this.titulo = "Vehiculo Editar"
  }
    
  fechasAbono(vehiculo:Vehiculo){
    vehiculo.abonoInicio = new Date();
    console.log("esta es la fecha de inicio del abono: ", vehiculo.abonoInicio.toLocaleString());
    
    vehiculo.abonoFin = this.abonoService.setearFinAbono(vehiculo);
    console.log("esta es la fecha de fin del abono: ", vehiculo.abonoFin.toLocaleString());
  }


}
