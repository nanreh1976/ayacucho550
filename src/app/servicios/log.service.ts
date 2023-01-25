import { Injectable } from '@angular/core';
import { StorageService } from './storage/storage.service';

@Injectable()

export class LogService {

    user$:any
    usuario:string
    newLog: any = {}

    constructor(
    private storageService:StorageService
    ) {
        this.setUser()
    }
    setUser() {
        this.storageService.usuario$.subscribe((data) => (this.user$ = data));
        this.usuario = this.user$['displayName'];
      }


    log(tipo: any, msg: any) {
        console.log("logger" + ": " + new Date() + ": " + JSON.stringify(this.usuario) + ":" + JSON.stringify(tipo) + ": " + msg.patente);
        this.newLog = {
            "Fecha": new Date(),
            "usuario": this.usuario,
            "tipo": tipo,
            "patente": msg.patente,
            "msg": msg,
            
        }

        // console.log(this.newLog)
        this.addItem("logger", this.newLog)
    }

    addItem(componente: string, item: any): void {

        // console.log("add itemcomponent", item,)

        this.storageService.addItem(componente, item)
    }

}