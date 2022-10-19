import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, } from '@angular/forms';
import { ServicioDatosService } from 'src/app/servicio-datos.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo';

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


  constructor(public activeModal: NgbActiveModal,

    private fb: FormBuilder,
  ) {
    this.createForm();
  }





  ngOnInit(): void {
    {
      // console.log("on init form", this.fromParent);
      this.titulo = this.fromParent.modo
      this.item = this.fromParent.item;
      if(this.item.op === 'Agregar'){ delete this.item.id_experiencia}
      this.configureForm(this.titulo, this.item);

    }
  }

  



  configureForm(titulo: string, item: any) {

    // console.log("configure form", titulo, item), (titulo !=='agregar');
    this.editForm.patchValue({
      patente: item .patente,
      marca: item .marca,
      modelo: item .modelo,
      color: item.color,
      egreso: item .egreso,
      ingreso: item .ingreso,    
      id: item.id,
    });

  }


  createForm() {
    this.editForm = this.fb.group({
      patente: [''],
      marca: [''],
      modelo: [''],
      color: [''],
      egreso: [''],
      ingreso: [''],
      id: [''],
    });
  }



  closeModal() {
    let value = {
   op: this.titulo,
   item: this.editForm.value
   
 };

//  console.log("closemodal", value)
 this.activeModal.close(value);

}



//   deleteXp(): void {
//     const vehiculo = this.editForm.value;
//     this.servicioDatosService.deleteXp(vehiculo)
//       .subscribe(() => {
//       });
//     this.closeModal("deleted xp");
//   }

  

//   addXp(): void {
//     const vehiculo = this.editForm.value
//     console.log(vehiculo);
//     this.servicioDatosService.addXp(vehiculo)
//       .subscribe(vehiculo => {
//        });
//     this.closeModal('added xp');
//  }


//   updateXp(): void {
//     const vehiculo = this.editForm.value;
//     this.servicioDatosService.updateXp(this.editForm.value)
//       .subscribe(() => {  this.activeModal.close});
//     this.closeModal('updated xp');
//   }

validarPatente(){  
  console.log(this.editForm.value.patente);
  const dominios = {
    patentesViejas : /^[a-zA-Z]{3}[\d]{3}$/,
    patentesNuevas : /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/,
  }
  
  if(dominios.patentesViejas.test(this.editForm.value.patente)){
    alert("es una patente vieja válida");                                 //ventanas de alert solo estan para probar si funciona
    this.closeModal();
    } else if (dominios.patentesNuevas.test(this.editForm.value.patente)){
      alert("es una patente nueva válida");      
      this.closeModal();
     }  else {
      alert("no es una patente válida");
     }
}
  

  
}
