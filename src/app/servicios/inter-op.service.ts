import { Injectable } from '@angular/core';
import { DbFirestoreService } from './database/db-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class InterOpService {

  constructor(
    private dbFirebase: DbFirestoreService,

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

   
  }

  addItem(componente: string, item: any): void {


     //item.fechaOp = new Date()
     this.dbFirebase.create(componente, item)
  //   .then((data) => console.log(data))
     .catch((e) => console.log(e.message));
      
     

 }

  updateItem(componente: string, item: any): void {

/*     this.servicioDatosService.updateItem(componente, item, item.id)
      .subscribe
      (data => {
        // this.data = data;
        // this.ngOnInit();
      });
 */
  }

}
