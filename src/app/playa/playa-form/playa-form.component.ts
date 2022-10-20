import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, } from '@angular/forms';
import { ServicioDatosService } from 'src/app/servicio-datos.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { PlayaI } from 'src/app/interfaces/playaI'
import * as moment from 'moment';
import { Tarifas } from 'src/app/interfaces/tarifas';

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
      //console.log("on init form", this.fromParent);
      this.titulo = this.fromParent.modo
      this.item = this.fromParent.item;
      if(this.titulo === 'Agregar'){ 
        this.configurarFecha()

      } else{
       // this.configureForm();
      }
      //this.configureForm(this.titulo, this.item);

    }
    
    //this.setearHora();
    this.getTarifas();
  }


//  configureForm() {

//     // console.log("configure form", titulo, item), (titulo !=='agregar');
//     this.editForm.patchValue({
//       patente: this.item.patente,
//       /* ingreso: this.item.ingreso, 
//       tarifa:item.tarifa,
//       descripcion:item.descripcion, 
//       id: item.id, */
//     });
//     this.fecha = this.item.ingreso
//     this.fechaIngreso = moment(this.fecha).format('L');
//     //  console.log(this.fechaIngreso);
//       this.horaIngreso = moment(this.fecha).format('LTS');
//     this.tarifaSeleccionada = this.item.tarifa; 
//   }
 
 
  createForm() {
    this.editForm = this.fb.group({
      patente: [''],      
      /* idTarifa: [''],
      descripcion: [''],
      id: [''], */
    });
   
  }

/*   setearHora(){
    this.editForm.setValue( {
      patente: [''],      
      idTarifa: [''],
      descripcion: [''],
      id: [''],   
  })
} */


closeModal() {
   let value = {
   op: this.titulo,
   item: this.puestoEstacionamiento,
   
 };

//  console.log("closemodal", value)
 this.activeModal.close(value);

} 

guardarDatos(){
    if(this.titulo === 'Agregar'){ 
      this.validarPatente();
    }else{
      /* this.armarPuestoEstacionamiento()
      this.closeModal(); */
    }
}


validarPatente(){                                                        //para el ingreso, el form primero valida la patente   
  console.log(this.editForm.value.patente);
  const dominios = {
    patentesViejas : /^[a-zA-Z]{3}[\d]{3}$/,
    patentesNuevas : /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/,
  }  
  if(dominios.patentesViejas.test(this.editForm.value.patente)){
    alert("es una patente vieja válida");                                 //ventanas de alert solo estan para probar si funciona
    this.armarPuestoEstacionamiento();                                             //si todo esta bien, llama la funcion para arma el puesto     
    } else if (dominios.patentesNuevas.test(this.editForm.value.patente)){
      alert("es una patente nueva válida");      
      this.armarPuestoEstacionamiento();                                          //si todo esta bien, llama la funcion para arma el puesto  
     }  else {
      alert("no es una patente válida");
     }
}


configurarFecha(){
  moment.locale("es");
  this.fecha = new Date();
  console.log(this.fecha);

  this.fechaIngreso = moment(this.fecha).format('L');
//  console.log(this.fechaIngreso);
  this.horaIngreso = moment(this.fecha).format('LTS');
//  console.log(this.horaIngreso);

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
  
  let tarifaForm

  tarifaForm = this.tarifas.filter(function(tarifas:any){
    return tarifas.nombre === e.target.value
  })

  console.log(tarifaForm); 
  

  this.tarifaSeleccionada = tarifaForm[0].nombre;
  
}

armarPuestoEstacionamiento() {                                      //la funcion crea el puesto
  this.puestoEstacionamiento = {
    
    patente: this.editForm.value.patente,
    ingreso: this.fecha,
    tarifa : this.tarifaSeleccionada,
    descripcion:"",
  } 

  console.log(this.puestoEstacionamiento)
  this.titulo="Agregar";
  this.item= this.puestoEstacionamiento;;
  console.log(this.item)
  this.closeModal();
}

  
}
