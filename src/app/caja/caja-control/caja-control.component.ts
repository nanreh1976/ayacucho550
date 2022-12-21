import { Component, OnInit, ɵcompileNgModuleFactory } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { Icaja } from 'src/app/interfaces/Icaja';

import { CajaCierreFormComponent } from '../forms/caja-cierre-form/caja-cierre-form.component';
import { CajaEgresoFormComponent } from '../forms/caja-egreso-form/caja-egreso-form.component';

import { CajaIngresoFormComponent } from '../forms/caja-ingreso-form/caja-ingreso-form.component';
import { CajaAperturaFormComponent } from '../forms/caja-apertura-form/caja-apertura-form.component';
import { EstadoCajaService } from 'src/app/servicios/estado-caja.service';
import { Observable } from 'rxjs';
import { CajaService } from '../caja.service';


@Component({
  selector: 'app-caja-control',

  template: `
    <div class="container">
      <div>
        <app-caja-view
          [$modoCaja]="$modoCaja"
   
          [saldo$]="saldo$"
          [usuario]="usuario"
          [cajaLog]="cajaLog"
          [$estadoCaja]="$estadoCaja"
            [data$]="data$"
          (newItemEvent)="getMsg($event)"
        ></app-caja-view>
      </div>
    </div>
  `,

  styleUrls: ['./caja-control.component.scss'],
})
export class CajaControlComponent implements OnInit {
  componente: string = 'caja';
  usuario!: string;

  // data recibida del crud
  // data!: Icaja[];
  $modoCaja: any;

  cajaLog: any;
  $estadoCaja: any;

  saldo$: Observable<any>;
  loading$: Observable<boolean>;
  data$: Observable<any>;
  noResults$: Observable<boolean>;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private dbFirebase: DbFirestoreService,
    private estadoCaja: EstadoCajaService,

    private cajas: CajaService
  ) { }

  ngOnInit(): void {

    // this.getAllSorted();
    this.setUser();
    this.estadoCaja.getCajaAbierta()
    this.$modoCaja = this.estadoCaja.getModoCaja()
    this.saldo$ = this.cajas.saldo$
    this.loading$ = this.cajas.loading$;
    this.noResults$ = this.cajas.noResults$;
    this.data$ = this.cajas.data$
    // this.calcularSaldo(this.data$);

    // esto es lo anterior para tomar estado caja ocupada o ono
    //  this.estadoCaja.getCajaAbierta()
    //  this.$modoCaja = this.estadoCaja.getModoCaja()

  }

  // settings y calculos

  setUser() {
    let user = JSON.parse(localStorage.getItem('user') || `{}`);
    this.usuario = user['displayName'];
  }

  // calcularSaldo(data: any) {
  //   this.saldo = 0;
  //   for (let item of data) {
  //     if (item.operacion === 'ingreso' || item.operacion === 'apertura') {
  //       this.saldo += Number(item.importe);
  //     } else {
  //       this.saldo -= Number(item.importe);
  //     }
  //   }
  // }



  getMsg(msg: any) {
    // console.log(msg, "from parent");
    this.openForm(msg.op, msg.item);
  }

  selectForm(modo: string) {
    // selecciona el form a mostrar segun la opcion elegida en la vsta
    switch (modo) {
      case 'Cierre de Caja': {
        return CajaCierreFormComponent;
        break;
      }
      case 'Apertura de Caja': {
        return CajaAperturaFormComponent;
        break;
      }

      case 'Egreso': {
        return CajaEgresoFormComponent;
        break;
      }

      case 'Ingreso': {
        return CajaIngresoFormComponent;
        break;
      }
      default: {
        return 'no hay operacion con ese nombre';
        break;
      }
    }
  }

  openForm(modo: string, item: any) {
    // seleccion el form a mostrar
    let selectedForm = this.selectForm(modo);

    // abre el form con el modal seleccionado
    const modalRef = this.modalService.open(selectedForm, {
      windowClass: 'myCustomModalClass',
      centered: true,
      size: 'lg',
    });

    let info = {
      modo: modo,
      item: item,
      saldo: this.saldo$,
    };

    // seleccion la opcion crud segun resultado form
    modalRef.componentInstance.fromParent = info;
    modalRef.result.then(
      (result) => {
        this.selectCrudOp(result.op, result.item);
      },
      (reason) => { }
    );
  }

  // seleccionar operacion CRUD

  selectCrudOp(op: string, item: any) {
    switch (op) {
      case 'Ingreso': {
        item.operacion = 'ingreso';
        this.addItem(this.componente, item);
        break;
      }

      case 'Egreso': {
        item.operacion = 'egreso';
        this.addItem(this.componente, item);
        break;
      }

      case 'Cierre de Caja': {
        this.cierreCaja(item);

        break;
      }

      case 'Apertura de Caja': {
        this.aperturaCaja();
        item.operacion = 'apertura';
        this.addItem(this.componente, item);
        break;
      }

      default: {
        console.log('sin operacion en case crud');
        break;
      }
    }
  }

  // operaciones de caja

  aperturaCaja() {
    // console.log("apertura de caja")
    // this.logger.log("apertura de caja", "");
  }

  cierreCaja(item: any) {
    // registra el cierre en la caja
    item.operacion = 'cierre';
    this.addItem(this.componente, item);
    console.log('cierre de caja');
    // tiene que cerrar la sesion de caja actual

    // tiene que pasar el modo de caja a cerrada
    //  this.estadoCaja = 'cerrada';
  }

  // CAJALOG

  // Cada sesion de caja tiene un id unico, y queda registrado en la coleccion CAJALOG
  // En el caja log se registra apertura, cierre, estado (abierto o cerrado ) usuario .
  // Solo puede haber una sesion abierta a la vez (porque hay una sola caja)


  // CRUD

  // getAll(): void {
  //   this.dbFirebase.getAll(this.componente).subscribe((data) => {
  //     this.data = data;
  //     localStorage.setItem(`${this.componente}`, JSON.stringify(data));

  //     this.calcularSaldo(this.data);
  //   });
  // }

  // // GET ALL ACTUALIZADO PARA LEER EL PAYLOAD
  // getAll2(): void {
  //   // llamar a getAll del servicio firebase para tener la lista de registros de caja
  //   this.dbFirebase.getAll2(this.componente).subscribe(data => {
  //     // data toma el listado de registros de caja
  //     this.data = data.map(e => {
  //       return {
  //         id: e.payload.doc.id,
  //         ...e.payload.doc.data() as {}
  //       } as unknown as Icaja;
  //     });
  //     localStorage.setItem(`${this.componente}`, JSON.stringify(data))
  //     //console.log(JSON.stringify(this.data))
  //     this.calcularSaldo(this.data)
  //   });

  // }

  // getAllSorted() {
  //   // pasar campo y orden (asc o desc)
  //   this.dbFirebase
  //     .getAllSorted(this.componente, 'fecha', 'desc')
  //     .subscribe((data) => {
  //       this.data = data.map((e) => {
  //         return {
  //           id: e.payload.doc.id,
  //           ...(e.payload.doc.data() as {}),
  //         } as unknown as Icaja;
  //       });

  //       // guardar en el local storage
  //       localStorage.setItem(`${this.componente}`, JSON.stringify(data));

  //       // calcular el saldo en cada actualizacion
  //       this.calcularSaldo(this.data);
  //     });
  // }

  // deleteItem(componente: string, item: any): void {

  //   console.log("delete itemcomponent", item,)

  //   this.dbFirebase.delete(componente, item.id)
  //     .then((data) => console.log(data))
  //     .then(() => this.ngOnInit())
  //     .then(() => console.log("pasa por delete metodo?"))
  //     .catch((e) => console.log(e.message));

  // }

  addItem(componente: string, item: any): void {
    // console.log('add itemcomponent', item);

    this.dbFirebase
      .create(componente, item)
      //   .then((data) => console.log(data))
      .then(() => this.ngOnInit())
      .catch((e) => console.log(e.message));
  }

  // updateItem(componente: string, item: any): void {
  //   console.log("update itemcomponent", item,)

  //   this.dbFirebase.update(componente, item)
  //     .then((data) => console.log(data))
  //     .then(() => this.ngOnInit())
  //     .catch((e) => console.log(e.message));

  // }
}
