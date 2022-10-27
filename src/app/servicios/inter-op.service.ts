import { Injectable } from '@angular/core';
import { ServicioDatosService } from './servicio-datos.service';

@Injectable({
  providedIn: 'root'
})
export class InterOpService {

  constructor(
    private servicioDatosService: ServicioDatosService

  ) { }



  ///////////////////////////////
  ///// OPERACIONES CRUD ////////

  // getAll(): void {
  //   this.servicioDatosService.getAll(this.componente).subscribe(
  //     datos => {
  //       this.data = datos;
  //       // console.log("get all ", this.componente, this.data)

  //     }
  //   );
  // }


  deleteItem(componente: string, item: any): void {

    console.log("delete component", item, item.id)
    this.servicioDatosService.deleteItem(componente, item.id)
      .subscribe
      (data => {
        // this.data = data;
        // this.ngOnInit();
      })
  }

  addItem(componente: string, item: any): void {

    console.log("add itemcomponent", item,)
    this.servicioDatosService.addItem(componente, item)
      .subscribe
      (data => {
        // this.data = data;
        // this.ngOnInit();
      });

  }

  updateItem(componente: string, item: any): void {

    this.servicioDatosService.updateItem(componente, item, item.id)
      .subscribe
      (data => {
        // this.data = data;
        // this.ngOnInit();
      });

  }

}
