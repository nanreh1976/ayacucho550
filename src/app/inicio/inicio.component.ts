import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { InterOpService } from '../servicios/inter-op.service';

import { ValidarPatenteService } from '../servicios/patentes/validar-patente.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<any>();

  op!: string
  private code: string = '';
  patenteForm: any
  searchText!: string;
  msg: any


  constructor(
    private fb: FormBuilder, public vpService: ValidarPatenteService
  ) {
    this.createForm()
  }

  ngOnInit(): void {
  }


  createForm() {
    this.patenteForm = this.fb.group({
      patente: ['', [Validators.required,
      Validators.minLength(6),
      this.vpService.evaluarPatente(),
      ]]
    });
  }

 
  get Patente() {
     // TOMA EL VALOR DEL CAMPO EN EL FORM
    return this.patenteForm.get("patente")
  }


  //TOMA LA OPERACION DEL BOTON SELECCIONADO EN EL FORM
  setOp(op: string) {
    this.op = op;
  }


  onSubmit() {
    let str = this.patenteForm.value.patente

    // CHEQUEA VALIDEZ FORM AL ENVIAR, SI PASA VEMOS QUE HACEMOS  
    if (this.patenteForm.valid) {

      console.log("form valido?", this.patenteForm.valid)

      // chequea si el str ingresado es barcode o patente
      if (this.vpService.isBarCode(str)) {
        if(this.op === "Eliminar"){
          Swal.fire({
            title: '¿Desea realizar la salida del vehículo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              console.log("submitted barcode")
              this.onScan(str)  //va a chequear el scan
            }
          })
        }else{
        console.log("submitted barcode")
        this.onScan(str)  //va a chequear el scan
        }  
      } else {
        if(this.op === "Eliminar"){
          Swal.fire({
            title: '¿Desea realizar la salida del vehículo?',
            //text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              console.log("submited patente")
              this.msgBack(this.op, str); //manda el form al parent
            }
          })
        }else{
          console.log("submited patente")
          this.msgBack(this.op, str); //manda el form al parent
        }  
      }
    } else {
      alert("NO DEBERIA LLEGAR ACA, SOLUCIONAR FILTROS EN LOS CAMPOS form invalid")
    }

  }




  onScan(code: string) {

    let playa = (JSON.parse(localStorage.getItem('playa')!))

    //recorre playa buscando barcode 
    for(var it of playa) {
      console.log(it)
      
      let cod = it['codigoBarras'] 
      let pat = it['patente']
      console.log(cod, pat)

      if (code === cod) {
        console.log("esta en playa", pat)
        this.msgBack(this.op, String(pat)) 
        break

      } else {
        console.log("NO esta en playa")
      }
  }

  }
 
  msgBack(op: string, str: string) {
    // ENVIA EL CONT DEL FORM AL PARENT
   let value = {
     op: op,
     item: {patente: str}  // antes    item: this.patenteForm.value,  -> chequear foramto
   }
   console.log("MSGbACK, aca emite el msj con el valor ", value);
   this.newItemEvent.emit(value);
   this.patenteForm.reset();
 }

}

