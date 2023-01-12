import { Component, OnInit, ɵcompileNgModuleFactory } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbFirestoreService } from 'src/app/servicios/database/db-firestore.service';
import { CajaCierreFormComponent } from '../forms/caja-cierre-form/caja-cierre-form.component';
import { CajaEgresoFormComponent } from '../forms/caja-egreso-form/caja-egreso-form.component';
import { CajaIngresoFormComponent } from '../forms/caja-ingreso-form/caja-ingreso-form.component';
import { CajaAperturaFormComponent } from '../forms/caja-apertura-form/caja-apertura-form.component';
import { EstadoCajaService } from 'src/app/servicios/estado-caja.service';
import { Observable } from 'rxjs';
import { CajaStorageService } from 'src/app/servicios/storage/caja-storage.service';

@Component({
  selector: 'app-caja-control',

  template: `
    <div class="container">
      <div>
        <app-caja-view
          [$modoCaja]="$modoCaja"
          [saldo$]="saldo$"
          [usuario]="usuario"
          [sesionCaja]="$sesionCaja"
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

  $modoCaja: any;
  $sesionCaja: any;
  $estadoCaja: any;

  saldo$: number;
  loading$: Observable<boolean>;
  data$: Observable<any>;
  noResults$: Observable<boolean>;

  constructor(
    private modalService: NgbModal,
    private estadoCajaService: EstadoCajaService,
    private cajaStorageService: CajaStorageService
  ) {}

  ngOnInit(): void {
    // this.getAllSorted();
    this.setUser();
    this.$sesionCaja = this.estadoCajaService.sesionCaja$;
    this.$modoCaja = this.estadoCajaService.modoCaja$;
    this.cajaStorageService.saldo$.subscribe((data) => (this.saldo$ = data));
    // this.saldo$ = this.cajaStorageService.saldo$;
    this.loading$ = this.cajaStorageService.loading$;
    this.noResults$ = this.cajaStorageService.noResults$;
    this.data$ = this.cajaStorageService.data$;
  }

  setUser() {
    let user = JSON.parse(localStorage.getItem('usuario') || `{}`);
    this.usuario = user['displayName'];
  }

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
      (reason) => {}
    );
  }

  // seleccionar operacion CRUD

  selectCrudOp(op: string, item: any) {
    switch (op) {
      case 'Ingreso': {
        item.operacion = 'ingreso';
        this.cajaStorageService.addItem(this.componente, item);
        break;
      }

      case 'Egreso': {
        item.operacion = 'egreso';
        this.cajaStorageService.addItem(this.componente, item);
        break;
      }

      case 'Cierre de Caja': {
        this.cierreCaja(item);

        break;
      }

      case 'Apertura de Caja': {
        this.aperturaCaja(item);
        break;
      }

      default: {
        console.log('sin operacion en case crud');
        break;
      }
    }
  }

  // operaciones de caja

  aperturaCaja(item: any) {
    // llama al metodo de estadoCaja para abrir sesion
    // una vez abierta, estado caja carga la primer operacion (item) que es saldo inicial.
    item.operacion = 'apertura';
    this.estadoCajaService.abrirSesion(item);
  }

  cierreCaja(item: any) {
    // registra en caja la operacion de cierre y $ que se extraen
    item.operacion = 'cierre';
    this.cajaStorageService.addItem(this.componente, item);
    console.log('cierre de caja');

    // llama al metodo de estadoCaja para el cierre de sesion
    this.estadoCajaService.cerrarSesion();
  }
}
