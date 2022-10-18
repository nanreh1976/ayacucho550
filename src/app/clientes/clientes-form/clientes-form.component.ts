import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, } from '@angular/forms';
import { ServicioDatosService } from 'src/app/servicio-datos.service';
import { Vehiculo } from 'src/app/vehiculo';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss']
})
export class ClientesFormComponent implements OnInit {

  @Input() fromParent: any;
  editForm!: any;
  titulo!: string;


  constructor(public activeModal: NgbActiveModal,
    private servicioDatosService: ServicioDatosService,
    private fb: FormBuilder,
  ) {

    this.createForm();

  }

  ngOnInit(): void {
    {
      console.log(this.fromParent);
      /* Output:
       {prop1: "Some Data", prop2: "From Parent Component", prop3: "This Can be anything"}
      */
      let xp = this.fromParent.empleo;
      let modo = this.fromParent.modo;
      this.configureForm(xp, modo);
      console.log(modo);
    }
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }


  configureForm(empleo: any, modo: number) {

    switch (modo) {
      case 0: { this.titulo = "Agregar" }; break;
      case 1: { this.titulo = "Editar"; }; break;
      case 2: { this.titulo = "Eliminar" };
    };

    this.editForm.patchValue({
      patente: empleo.patente,
      marca: empleo.marca,
      modelo: empleo.modelo,
      color: empleo.color,
      egreso: empleo.egreso,
      ingreso: empleo.ingreso,    
      id: empleo.id,
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

  deleteXp(): void {
    const xp = this.editForm.value;
    this.servicioDatosService.deleteXp(xp)
      .subscribe(() => {
      });
    this.closeModal("deleted xp");
  }

  addXp(): void {
    const xp = this.editForm.value
    console.log(xp);
    this.servicioDatosService.addXp(xp)
      .subscribe(xp => {
       });
    this.closeModal('added xp');
 }


  updateXp(): void {
    const xp = this.editForm.value;
    this.servicioDatosService.updateXp(this.editForm.value)
      .subscribe(() => {  this.activeModal.close});
    this.closeModal('updated xp');
  }


  
}
