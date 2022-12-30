import { Injectable } from '@angular/core';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterOpService {

  constructor(
   private storageService:StorageService

  ) { }



  addItem(componente: string, item: any): void {
     //item.fechaOp = new Date()
     this.storageService.addItem(componente, item)
 }


}
