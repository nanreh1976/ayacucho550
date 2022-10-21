import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, } from '@angular/forms';
import { ServicioDatosService } from 'src/app/servicio-datos.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { PlayaI } from 'src/app/interfaces/playaI'
import * as moment from 'moment';
import { Tarifas } from 'src/app/interfaces/tarifas';
import { Fechas } from 'src/app/interfaces/fechas';

@Component({
  selector: 'app-playa-form',
  templateUrl: './playa-form.component.html',
  styleUrls: ['./playa-form.component.css']
})
export class PlayaFormComponent implements OnInit {

  @Input() fromParent: any;
  editForm!: any;
  titulo!: string;
  item!: any
  fecha!:Date;
  fechas: Fechas = {
    fechaDate : "",
    fechaIngreso: "",
    horaIngreso: "",
};  
  fechaIngreso!:any;
  horaIngreso!:any;
  tarifas!: Tarifas [];
  componenteTarifas: string = "tarifas"
  puestoEstacionamiento!: PlayaI;
  tarifaSeleccionada!: string;
  


  constructor(public activeModal: NgbActiveModal, private servicioDatosService: ServicioDatosService,

    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    {
      console.log("on init form", this.fromParent);
      this.titulo = this.fromParent.modo
      this.item = this.fromParent.item;
      console.log(this.item);
      
      if(this.titulo === 'Agregar'){                                  //si es un ingreso nuevo, se llama a la funcion para configurar la fecha
        this.configurarFecha()
      } 
      //else if (this.titulo === 'Editar')
      else
      {                           //si es una edicion, se guardan las fechas y las tarifas y se llama a la funcion para configurar form
        this.tarifaSeleccionada = this.item.tarifa;
        this.fechas = this.item.fechas;
        this.configurarForm();
        this.pruebaCierreHora();
      }
     

    }    
    
    this.getTarifas();                                                //se traen las tarifas
  }

  createForm() {                                               
    this.editForm = this.fb.group({
      patente: [''],  
      descripcion: [''],          
    });   
  }

  configurarForm(){                                                          //se configura el form con los datos del objeto
    this.editForm.patchValue({ 
      patente: this.item.patente,
      descripcion: this.item.descripcion,
    })
  }

  guardarDatos(){
    if(this.titulo === 'Agregar'){                                      //si es un ingreso nuevo, valida la patente
     this.validarPatente() ;     
    } else 
    // if (this.titulo === "Editar")
    {                                //si es una edicion, se arma el puesto con los nuevos datos
      this.armarPuestoEstacionamiento()      
    }
}

closeModal() {
   let value = {
   op: this.titulo,
   item: this.puestoEstacionamiento,
   
 };
//  console.log("closemodal", value)
 this.activeModal.close(value);
} 


validarPatente(){                                                        
  console.log(this.editForm.value.patente);
  const dominios = {
    patentesViejas : /^[a-zA-Z]{3}[\d]{3}$/,
    patentesNuevas : /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/,
    patentesMotosViejas : /^[0-9]{3}[a-zA-Z]{3}$/,
    patentesMotosNuevas : /^[a-zA-Z]{1}[0-9]{3}[a-zA-Z]{3}$/,
    
  }  
  if(dominios.patentesViejas.test(this.editForm.value.patente)){
    alert("es una patente vieja válida");
    this.validarTarifa()                                 
    //this.armarPuestoEstacionamiento();                                             //si todo esta bien, llama la funcion para arma el puesto     
    } else if (dominios.patentesNuevas.test(this.editForm.value.patente)){
      alert("es una patente nueva válida"); 
      this.validarTarifa()     
      //this.armarPuestoEstacionamiento();                                          //si todo esta bien, llama la funcion para arma el puesto  
    } else if (dominios.patentesMotosViejas.test(this.editForm.value.patente)){
      alert("es una patente de moto vieja válida");      
      this.validarTarifa()
      //this.armarPuestoEstacionamiento();
    } else if (dominios.patentesMotosNuevas.test(this.editForm.value.patente)){
      alert("es una patente de moto nueva válida");      
      this.validarTarifa()
      //this.armarPuestoEstacionamiento();
      
    }  else {
      alert("no es una patente válida");
     }
}

 validarTarifa(){

 if(this.tarifaSeleccionada !== undefined){
  this.armarPuestoEstacionamiento();
 } else {
  alert("no elegiste la tarifa");
 }
 }

configurarFecha(){
  moment.locale("es");                                                                     
  this.fecha = new Date();                                                        // toma la fecha actual    
  console.log(this.fecha);

  this.fechas.fechaIngreso = moment(this.fecha).format('L');                      // desgloza la fecha en formato (DD/MM/YYYY) y la guarda en el objeto fechas
  console.log(this.fechas.fechaIngreso);
  this.fechas.horaIngreso = moment(this.fecha).format('LTS');                     // desgloza la fecha en formato (hh:mm:ss) y la guarda en el objeto fechas
  console.log(this.fechas.horaIngreso);
  this.fechas.fechaDate = this.fecha.toString()
  console.log(this.fechas.fechaDate);
  this.fechas.fechaDate

} 

pruebaCierreHora(){  
  // pruebas para ver como obtener la diferencia entre ingreso y Salida
  
  /* let fecha1= "20/10/2022"
  let fecha2= "10:34:57"
  let fechaCierre = new Date()  
  let fechaDePrueba= moment(`${fecha1}${fecha2}`, "DDTMMTYYYYhhmmss").diff(fechaCierre, "minutes");   // entrega la diferencia entre la fecha ingresada y el momento actual en minutos
  console.log(fechaDePrueba); */
  
  let pruebaCierreHora= moment(this.fechas.fechaDate).diff(new Date(),"minutes");   // entrega la diferencia entre la fecha ingresada y el momento actual en minutos
  console.log(pruebaCierreHora);
  
}

getTarifas()  {
  this.servicioDatosService.getAll(this.componenteTarifas).subscribe (
    datos => {this.tarifas = datos;
    console.log("get all tarifas", this.componenteTarifas, this.tarifas)  
    }
  );
}

changeTarifa(e: any) {
  console.log(e.target.value)  
  let tarifaForm   //crea una variable para usarlo con la funcion filter

  tarifaForm = this.tarifas.filter(function(tarifas:any){       //filter recorre el array tarifas y devuelve otro array con lo que sea q coincida con el parametro
    return tarifas.nombre === e.target.value
  })
  
  this.tarifaSeleccionada = tarifaForm[0].nombre;               //se guarda el nombre de la tarifa seleccionada en la variable
}

armarPuestoEstacionamiento() {     
  //la funcion arma el puesto
  this.puestoEstacionamiento = {
    id: this.item.id,
    patente: this.editForm.value.patente,
    fechas: this.fechas,
    tarifa : this.tarifaSeleccionada,
    descripcion:this.editForm.value.descripcion,
  } 
  //if (tarifa="undifined"){


  
  this.item= this.puestoEstacionamiento;;                         //gurda el puesto en "item" para poder enviarlo
  console.log(this.item)
  this.closeModal();
}

  
}
