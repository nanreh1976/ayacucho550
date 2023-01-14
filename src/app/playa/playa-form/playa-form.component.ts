import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, } from '@angular/forms';

import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { PlayaI } from 'src/app/interfaces/playaI'
import * as moment from 'moment';
import { Tarifas } from 'src/app/interfaces/tarifas';
import { Fechas } from 'src/app/interfaces/fechas';
import { ValidarPatenteService } from 'src/app/servicios/patentes/validar-patente.service';
import { CalculoFechasService } from 'src/app/servicios/Fechas/calculo-fechas.service';
import { EstadiaService } from 'src/app/servicios/facturacion/estadia.service';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { LogService } from 'src/app/servicios/log.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playa-form',
  templateUrl: './playa-form.component.html',
  styleUrls: ['./playa-form.component.css']
})
export class PlayaFormComponent implements OnInit {

  @Input() fromParent: any;
  barCodeId:string="BCN"
  editForm!: any;
  titulo!: string;
  item!: any;
  fecha!: Date;
  fechas: Fechas = {
    fechaDate: "",
    fechaIngreso: "",
    horaIngreso: "",
    fechaSalidaDate: "",
    fechaSalida: "",
    horaSalida: "",
    estadia: 0,

  };
  fechaSalida!: Date;
  horaIngreso!: any;
  tarifas!: Tarifas[];
  componenteTarifas: string = "tarifas"
  puestoEstacionamiento!: any;
  tarifaSeleccionada!: Tarifas;
  saldo!: number;
  patenteNueva!: boolean;
  patentesPlaya!: any;
  clienteExiste: any;
  sinEdicion: boolean = true;
  vehiculoEliminar!: any;
  tarifaEliminar: Tarifas;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private validacionPatente: ValidarPatenteService,
    private fechaService: CalculoFechasService,
    private estadiaService: EstadiaService,
    private clientesService: ClientesService,
    private logger: LogService

  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTarifas();
    this.getPlaya();                                                    //se traen las tarifas    
    {
      //console.log("on init form", this.fromParent);
      this.titulo = this.fromParent.modo
      this.item = this.fromParent.item;
      this.editForm.patchValue({
        patente: this.fromParent.item.patente,
      })

      switch (this.titulo) {
        case 'Agregar': {
          this.saldo = 0;
          this.item.id = "";
          this.buscarPatente();
          this.configurarFecha();
          this.buscarCliente();
          break;
        }

        case 'Editar': {
          this.sinEdicion = false;
          this.saldo = 0;
          this.tarifaSeleccionada = this.item.tarifa;
          this.fechas = this.item.fechas;
          this.configurarForm();
          break;
        }
        case 'Eliminar': {
          this.buscarPatente();
          this.eliminarVehiculo();
          this.pruebaCierreHora();
          break;
        }

        case 'Reimprimir': {
          this.saldo = 0;
          this.tarifaSeleccionada = this.item.tarifa;
          this.fechas = this.item.fechas;
          this.armarPuestoEstacionamiento();

          break;
        }

        default: {

          break;
        }
      }
    }
  }

  createForm() {
    this.editForm = this.fb.group({
      patente: ['', [Validators.required, Validators.minLength(6), this.validacionPatente.evaluarPatente()]],
      descripcion: [''],
    });
  }

  get Patente() {
    return this.editForm.get("patente")
  }

  configurarForm() {                                                          //se configura el form con los datos del objeto
    this.editForm.patchValue({
      patente: this.item.patente,
      descripcion: this.item.descripcion,
    })
  }

  onSubmit() {
    this.guardarDatos();
    /* if(this.editForm.valid){                                        //esto no funciona y no se pq
     this.guardarDatos();
     }else {
       console.log("form is invalid")
       }  */
  }



  guardarDatos() {

    switch (this.titulo) {
      case 'Agregar': {
        this.validarTarifa();
        break;
      }
      case 'Editar': {
        //this.validarPatente() ;
        this.getPlaya();
        this.validarTarifa();

        break;
      }
      default: {
        //console.log("algo se rompio")
        break;
      }
    }
  }

  closeModal() {
    //console.log(this.puestoEstacionamiento);

    let value = {
      op: this.titulo,
      item: this.puestoEstacionamiento,

    };
    console.log("closemodal", value)
    this.activeModal.close(value);
  }


  validarPatente() {

    //console.log(`esto es dentro de validarPatente: ${this.editForm.patente}`);

    let patenteValida = this.validacionPatente.validarPatente(this.editForm.value.patente);

    if (patenteValida) {
      console.log("es una patente valida")
      //this.validarTarifa()
    } else {
      console.log("no es una patente valida")
      this.activeModal.dismiss()
    }

  }

  validarTarifa() {

    if (this.tarifaSeleccionada !== undefined) {
      this.armarPuestoEstacionamiento();
    } else {
      alert("no elegiste la tarifa");
    }
  }

  buscarPatente() {
    //console.log("metodo buscar patente. playa: ", this.patentesPlaya);
    if(this.titulo ==="Eliminar"){
      this.patenteNueva = this.validacionPatente.buscarPatentePlaya(this.editForm.value.patente, this.patentesPlaya);
      if (this.patenteNueva === true) {
        this.titulo="ErrorEliminar"
        this.ventanaConfirmacion();
      }  
    } else {
      this.patenteNueva = this.validacionPatente.buscarPatentePlaya(this.editForm.value.patente, this.patentesPlaya);
      if (this.patenteNueva === false) {
        this.titulo="PatenteIngresada"
        this.ventanaConfirmacion();
      }
    }
  }

  configurarFecha() {

    this.fecha = this.fechaService.fechaActual();                                                        // toma la fecha actual    
    //console.log(this.fecha);

    this.fechas.fechaIngreso = this.fechaService.fechaDia(this.fecha);                      // desgloza la fecha en formato (DD/MM/YYYY) y la guarda en el objeto fechas
    //console.log(this.fechas.fechaIngreso);

    this.fechas.horaIngreso = this.fechaService.fechaHora(this.fecha);                     // desgloza la fecha en formato (hh:mm:ss) y la guarda en el objeto fechas
    //console.log(this.fechas.horaIngreso);

    this.fechas.fechaDate = this.fecha.toString()
    ////console.log(this.fechas.fechaDate);


  }

  pruebaCierreHora() {

    //console.log(this.item);  
    //console.log(this.titulo);

    this.fechaSalida = this.fechaService.fechaActual(); // entrega la diferencia entre la fecha ingresada y el momento actual en minutos
    //console.log("esta es la fecha de salida: ", this.fechaSalida);

    this.fechas.fechaSalida = this.fechaService.fechaDia(this.fechaSalida);
    //console.log("esta es el dia de la salida: ", this.fechas.fechaSalida);

    this.fechas.horaSalida = this.fechaService.fechaHora(this.fechaSalida);
    //console.log("esta es la de la salida: ", this.fechas.horaSalida); 

    this.fechas.estadia = this.fechaService.pruebaCierreHora(this.fechas.fechaDate);
    //console.log("esta es la fecha de ingreso date: ", this.fechas.fechaDate)
    //console.log("esta es la fecha.estadia: ", this.fechas.estadia);

    this.fechas.fechaSalidaDate = this.fechaSalida.toString();
    // console.log("esta es la fecha salida to string: ", this.fechas.fechaSalidaDate);


    this.saldoEstadia();



  }

  getTarifas() {
    this.tarifas = JSON.parse(localStorage.getItem("tarifas") || `{}`)
    console.log("estas son las tarifas: ", this.tarifas);

  }

  changeTarifa(e: any) {
    console.log(e.target.value)
    let tarifaForm   //crea una variable para usarlo con la funcion filter

    tarifaForm = this.tarifas.filter(function (tarifas: any) {       //filter recorre el array tarifas y devuelve otro array con lo que sea q coincida con el parametro
      return tarifas.nombre === e.target.value
    })

    this.tarifaSeleccionada = tarifaForm[0];               //se guarda el nombre de la tarifa seleccionada en la variable
    console.log(this.tarifaSeleccionada);

  }

  saldoEstadia() {

    this.saldo = this.estadiaService.saldoEstadia(this.tarifaSeleccionada, this.fechas.estadia);

    this.armarPuestoEstacionamiento();
  }

  armarPuestoEstacionamiento() {
    let fechaLimpia = this.fechas.fechaIngreso.replace(/[^0-9A-Z]+/gi,"")
    let horaLimpia = this.fechas.horaIngreso.replace(/[^0-9A-Z]+/gi,"")
    //la funcion arma el puesto
    this.puestoEstacionamiento = {
      id: this.item.id,
      patente: this.editForm.value.patente,
      fechas: this.fechas,
      tarifa: this.tarifaSeleccionada,
      descripcion: this.editForm.value.descripcion,
      saldo: this.saldo,
      codigoBarras: `${this.barCodeId}-${this.fromParent.item.patente}${fechaLimpia}${horaLimpia}`
    }

    this.item = this.puestoEstacionamiento;;                         //gurda el puesto en "item" para poder enviarlo
    //console.log("este es el item final: ", this.puestoEstacionamiento)
    //this.closeModal();
    this.ventanaConfirmacion()
  }

  getPlaya() {

    this.patentesPlaya = JSON.parse(localStorage.getItem("playa") || `{}`)


  }

  buscarCliente() {
    /* console.log(this.vehiculos);
    console.log(this.clientes); */
    let consulta = this.clientesService.buscarPatente(this.fromParent.item.patente);
    console.log("esto es buscar cliente. respuesta a la consulta: ", consulta);

    if (consulta.clienteExiste) {                         //este camino es si el cliente existe en la base de datos
      //console.log(consulta.datosCliente);
      this.clienteExiste = consulta.datosVehiculo;
      console.log("esto es clienteExiste: ",this.clienteExiste);

      //this.tarifaSeleccionada = this.buscarTarifa(this.clienteExiste.idTarifa);
      this.tarifaSeleccionada = this.clienteExiste.tarifa;
      //console.log(this.tarifaSeleccionada);

      this.titulo="Cliente"
      this.armarPuestoEstacionamiento()

    }


  }

  buscarTarifa(id: number) {
    let tarifas = JSON.parse(localStorage.getItem("tarifas") || `{}`)

    tarifas = tarifas.filter(function (tarifa: any) {
      return tarifa.id === id;
    });
    //console.log(tarifas[0]);

    return tarifas[0]
  }

  eliminarVehiculo() {
    /* console.log("esto es eliminar vehiculo. patente: ", this.editForm.value.patente );
    console.log("esto es eliminar vehiculo. playa: ", this.patentesPlaya); */

    this.vehiculoEliminar = this.validacionPatente.eliminarVehiculo(this.editForm.value.patente, this.patentesPlaya);
    //console.log("esto es eliminar vehiculo. vehiculo: ", this.vehiculoEliminar); 

    this.fechas = this.vehiculoEliminar.fechas;
    // console.log("esta es las fechas del vehiulo a eliminar. Fechas: ", this.fechas);

    this.tarifaSeleccionada = this.vehiculoEliminar.tarifa;
    //console.log("este es la tarifa del vehiculo a eliminar: ", this.tarifaSeleccionada);

    this.item = this.vehiculoEliminar;;                         //gurda el puesto en "item" para poder enviarlo
    //console.log("esto es eliminar vehiculo. item: ", this.item);


  }

  ventanaConfirmacion(){
    switch (this.titulo) {
      case 'Agregar': {
        Swal.fire({
          title: '¿Desea confirmar el ingreso?',
          //text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
           /*  Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success' 
            )*/
            this.closeModal();
          }
        })
        break;
      }
      case 'Editar': {
        Swal.fire({
          title: '¿Desea confirmar las modificaciones?',
          //text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
           /*  Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success' 
            )*/
            this.closeModal();
          }
        })
        break;
      }
      case 'Eliminar': {
        this.closeModal();        
        break;
      }
      case 'Reimprimir': {
        this.closeModal();
        break;
      }
      case 'PatenteIngresada':{
        Swal.fire('La patente ya fue ingresada');
        this.activeModal.dismiss();
        break;
      }
      case 'ErrorEliminar':{
        Swal.fire('No es una patente ingresada');
        this.activeModal.dismiss();
        break;
      }
      case 'Cliente':{
        this.titulo="Agregar";
        Swal.fire('Cliente con abono');
        if(this.clienteExiste.estado === 0){
          Swal.fire({
            title: 'El abono esta vencido',
            text: "Regularice la situación del cliente",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {             
              this.closeModal();
            }
          })
        }
        this.closeModal();
        break
      }
      default: {
        //console.log("algo se rompio")
        break;
      }
    }
    
  }

}
