import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Clientes } from 'src/app/interfaces/clientes';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-abono',
  templateUrl: './pago-abono.component.html',
  styleUrls: ['./pago-abono.component.scss']
})
export class PagoAbonoComponent implements OnInit {

  @Input() fromParent: any;
  titulo!: any;
  item!: Vehiculo;
  cliente: Clientes;

  constructor(public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {

    console.log("fromParent: ", this.fromParent );
    
    this.titulo = this.fromParent.modo
    this.item = this.fromParent.item;
    this.cliente = this.fromParent.cliente
  }

  closeModal() {
    //console.log(this.puestoEstacionamiento);

    let value = {
      op: this.titulo,
      item: this.item,

    };
    console.log("closemodal", value)
    this.activeModal.close(value);
  }

  pago(){
    Swal.fire({
      title: '¿Desea confirmar el pago?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Pago efectuado',
          //'Your file has been deleted.',
          //'success'          
        )
        this.closeModal()
      }
    })
  }

}
