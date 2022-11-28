import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  public lastScanned: { code: string, times: number };

  patenteForm: any
  searchText!: string;
  msg: any

  constructor(
    private fb: FormBuilder, public vpService: ValidarPatenteService
  ) {
    this.createForm()
  }

  createForm() {

    this.patenteForm = this.fb.group({

      patente: ['', [Validators.required,
      Validators.minLength(6),
      this.vpService.evaluarPatente,
      ]]
    });
  }


  // ENVIA EL CONT DEL FORM AL PARENT
  msgBack(op: string, patente: string) {
    let value = {
      op: op,
      item: this.patenteForm.value,
    }
    console.log("MSGbACK, aca emite el msj con el valor ", value);
    this.newItemEvent.emit(value);
    this.patenteForm.reset();
  }


  ngOnInit(): void {


  }

  // TOMA EL VALOR DEL CAMPO EN EL FORM
  get Patente() {
    return this.patenteForm.get("patente")
  }


  onSubmit() {
    let str = this.patenteForm.value.patente

    // CHEQUEA VALIDEZ FORM AL ENVIAR, SI PASA VEMOS QUE HACEMOS  
    if (this.patenteForm.valid) {

      console.log("form valido?", this.patenteForm.valid)

      // chequea si el str ingresado es barcode o patente
      if (this.vpService.isBarCode(str)) {
        console.log("submitted barcode")
    
        this.onScan(str)

      } else {
        console.log("submited patente")
        // this.msgBack(this.op, str);
      }
    } else {
      alert("NO DEBERIA LLEGAR ACA, SOLUCIONAR FILTROS EN LOS CAMPOS form invalid")
    }

  }

  //TOMA LA OPERACION DEL BOTON SELECCIONADO EN EL FORM
  setOp(op: string) {
    this.op = op;
  }



  onScan(code: string) {
    //console.log(JSON.parse(localStorage.getItem('playa')!));
    let objVal = JSON.parse(localStorage.getItem('playa')!)



      const printKeyAndValue = (objVal: any) => {
        for (const key of Object.keys(objVal)){
            console.log(key);
            console.log(objVal[key]);   
        }
      
     
  }

  
    // chequear que el barcode este en playa
    // si esta en playa manda el form para egreso
    //this.msgBack("Eliminar", pat)
    // sino esta, manda alert (y resetea el form?)
 


  }

  // Escucha cualquier evento que termine en \n, supone que es lector de barras
  // chequea que no sea escaneo repetido y llama a onScan con el codigo
  // @HostListener('window:keypress', ['$event'])
  // protected keyEvent(event: KeyboardEvent): void {
  //   if (event.key === 'Enter') {
  //     console.log("es o no Barcode: ", this.code, this.vpService.isBarCode(this.code))
  //     if (this.lastScanned?.code === this.code) {
  //       this.lastScanned.times++;
  //       console.log("codigo repetido");
  //     } else {

  //       this.lastScanned = {
  //         code: this.code,
  //         times: 1
  //       };
  //     }

  //     this.onScan(this.code);
  //     this.code = '';
  //   } else {
  //     this.code += event.key;
  //   }
  // }







}

