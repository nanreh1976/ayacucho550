import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { unitOfTime } from 'moment';

import { LogService } from 'src/app/servicios/log.service';
import Swal from 'sweetalert2';
//import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-tarifas-form',
  templateUrl: './tarifas-form.component.html',
  styleUrls: ['./tarifas-form.component.scss']
})
export class TarifasFormComponent implements OnInit {

  @Input() fromParent: any;
  editForm!: any;
  titulo!: string;
  item!: any ;
  componente: string = 'unidadTiempo';
  unidadSeleccionada! : any ;   
  categoriaSeleccionada! :any;
  vehiculoSeleccionado!: any
  nombre!:any;
  nombreT!:any;
  

  unidadTiempo = [{ id: 0, unidad_tiempo: 'minutos', },
  { id: 1, unidad_tiempo: 'hora', },
  { id: 2, unidad_tiempo: 'dia', },
  { id: 3, unidad_tiempo: 'semana', },
  { id: 4, unidad_tiempo: 'mes', },
  { id: 5, unidad_tiempo: 'semestral', }];

  vehiculos = [
    { id: 0, nombre: 'moto', },
    { id: 1, nombre: 'auto', },
    { id: 2, nombre: 'utilitario', },
    { id: 3, nombre: 'otro', },    
  ];

  categorias = [
    { id: 0, nombre: 'moto-base', },
    { id: 1, nombre: 'auto-base', },
    { id: 2, nombre: 'utilitario-base', },
    { id: 3, nombre: 'promo', },    
  ];
  




  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private logger: LogService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    {
      console.log("on init form", this.fromParent);
      this.titulo = this.fromParent.modo
      //this.item = this.fromParent.item;                                                   // todo esto va en el switch (this.titulo) de acuerdo a cada operacion
      //this.editForm.value.unidad_tiempo = this.fromParent.item.unidad_tiempo;
      //if (this.item.op === 'Agregar') { delete this.item.id}
      //this.configureForm(this.titulo, this.item);


      //this.unidadSeleccionada = this.item.unidad_tiempo;

    }
  
    //estos son los distintos caminos cuando se inicia el componente
      switch (this.titulo) {                            
        case 'Agregar': {                                             //agregar es crear una tarifa nueva. no hay que hacer nada, esta todo vacio.                                                   
          //this.nombre = this.item.tarifa;
        // this.item.id = "";
                break;
        }

        case 'Editar': {
          this.item = this.fromParent.item;                        //si es editar, se guardan los datos q recibe el componente en this.item         
          this.unidadSeleccionada = this.item.unidad_tiempo;      //se guarda la unidad seleccionada en this.unidadSeleccionada
          this.categoriaSeleccionada = this.item.categoria        //se guarda la categoria en this.categoriaSeleccionada
          this.configureForm();                                   //se llama al metodo para configurar el form
          break;
        }
        case 'Eliminar': {
          this.item = this.fromParent.item; 
          this.closeModal()
          break;
        }
          default: {
            
          }
      }
  }

  //esto se crea cuando se construye el componente
  createForm(): void {
    this.editForm = this.fb.group({
      nombre: [''],
      unidad_tiempo: [''],
      valor: ['', Validators.pattern(/^[0-9]{1,256}$/)],
      fraccion: ['', Validators.pattern(/^[0-9]{1,256}$/)],
      categoria: [''],
      vehiculo: [''],
      tolerancia: ['', Validators.pattern(/^[0-9]{1,256}$/)],
      id: [''],
    });
  }

  get Valor() {
    return this.editForm.get("valor"); 
  }

  get Fraccion() {
    return this.editForm.get("fraccion"); 
  }

  get Tolerancia() {
    return this.editForm.get("tolerancia"); 
  }

  configureForm() {
    
    this.editForm.patchValue({
      nombre: this.item.nombre,
      unidad_tiempo: this.item.unidad_tiempo,
      valor: this.item.valor,
      fraccion: this.item.fraccion,
      vehiculo: this.item.vehiculo,
      categoria: this.item.categoria,
      tolerancia: this.item.tolerancia,
      id: this.item.id,
    });

  }
  
  //esto selecciona la unidad de tiempo
  changeUnidadTiempo(e: any) {
    console.log(e.target.value)    
    /* como en la interface tarifa, el atributo unidad_tiempoes un string, no hace falta hacer
    todo lo de abajo. con guardar el valor que recibe del evento (e.target.value) alcanza*/
    /* 
    let unidadForm   //crea una variable para usarlo con la funcion filter
  
    unidadForm = this.unidadTiempo.filter(function(unidadTiempo:any){       //filter recorre el array tarifas y devuelve otro array con lo que sea q coincida con el parametro
      return unidadTiempo.unidad_tiempo === e.target.value
    })
    
    this.unidadSeleccionada = unidadForm[0];               //se guarda el nombre de la tarifa seleccionada en la variable */
    this.unidadSeleccionada = e.target.value
    console.log(this.unidadSeleccionada);
    
  }

  //esto selecciona la unidad de tiempo
  changeCategoria(e: any) {
    console.log(e.target.value)  ; 
    
    this.categoriaSeleccionada = e.target.value
    console.log(this.categoriaSeleccionada);
    
  }

  changeVehiculo(e: any) {
    console.log(e.target.value)  ; 
    
    this.vehiculoSeleccionado = e.target.value
    console.log(this.vehiculoSeleccionado);
    
  }

  
  /* configurarForm() {                                                          //esto no se usa
    this.editForm.patchValue({
      patente: this.item.nombre,
      descripcion: this.item.descripcion,
    })
  } */

  //esto llama el form para guardar los datos
  onSubmit() {
    this.guardarDatos();
  };

  guardarDatos() {

    //segun el camino que sea (agregar/editar/eliminar)
    //en este caso, agregar y editar hacen lo mismo
    //pero te lo dejo para que veas que son caminos distintos
    switch (this.titulo) {
      case 'Agregar': {
        
        this.item = this.editForm.value                     //guarda los valores del form en item
        this.item.unidad_tiempo = this.unidadSeleccionada   //guarda la unidad seleccionada en el item
        this.item.categoria = this.categoriaSeleccionada    //guarda la categoria seleccionada en el item
        this.item.vehiculo = this.vehiculoSeleccionado      
        Swal.fire({
          title: '¿Desea guardar la tarifa?',
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
            this.closeModal();                                  //cierra el modal
          }
        })
        
        break;
      }
      case 'Editar': {        
        this.item = this.editForm.value                     //guarda los valores del form en item
        this.item.unidad_tiempo = this.unidadSeleccionada   //guarda la unidad seleccionada en el item
        this.item.categoria = this.categoriaSeleccionada    //guarda la categoria seleccionada en el item
        this.item.vehiculo = this.vehiculoSeleccionado      
        Swal.fire({
          title: '¿Desea confirmar los cambios?',
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
            this.closeModal();                                  //cierra el modal
          }
        })       

        break;
      }
      default: {
        console.log("algo se rompio")
        break;
      }
    }
  }
  

  closeModal() {
    let value = {
      op: this.titulo,      
      item: this.item,
    };

    console.log("closemodal", value)
    this.activeModal.close(value);

  }

  //esto no se que hace. no se usa
  /* buscarUnidad(id: number) {
    let unidad = JSON.parse(localStorage.getItem("unidadTiempo") || `{}`)

    unidad = unidad.filter(function (unidad_tiempo: any) {
      return unidad_tiempo.id === id;
    });
    //console.log(tarifas[0]);

    return unidad[0]
  } */

 /*  getNombreT(){

  this.nombreT = JSON.parse(localStorage.getItem("tarifa") || `{}`)                       //?? no se para que es esto
  } */
  
//este metodo no se usa
  /* eliminarTarifa() {
    // console.log("esto es eliminar vehiculo. patente: ", this.editForm.value.patente );
    //console.log("esto es eliminar vehiculo. playa: ", this.patentesPlaya); 

    //this.tarifaEliminar = this.eliminarTarifa(this.editForm.value.item,this.nombreT);
    //console.log("esto es eliminar vehiculo. vehiculo: ", this.vehiculoEliminar); 

   //     this.tarifaSeleccionada = this.tarifaSeleccionada.item;
    //console.log("este es la tarifa del vehiculo a eliminar: ", this.tarifaSeleccionada);

   // this.item = this.tarifaEliminar;;                         //gurda el puesto en "item" para poder enviarlo
    //console.log("esto es eliminar vehiculo. item: ", this.item);


  } */
  }