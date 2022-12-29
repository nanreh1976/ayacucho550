import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()

export class LogService {

    newLog: any = {}

    constructor(
    private storageService:StorageService
    ) {
    }


    user= JSON.parse(localStorage.getItem("user")||`{}`)
    usuario = (this.user['displayName'])

    log(tipo: any, msg: any) {
        console.log("logger" + ": " + new Date() + ": " + JSON.stringify(this.usuario) + ":" + JSON.stringify(tipo) + ": " + msg.patente);
        this.newLog = {
            "Fecha": new Date(),
            "usuario": this.usuario,
            "tipo": tipo,
            "patente": msg.patente,
            "msg": msg,
            
        }

        console.log(this.newLog)
        this.addItem("logger", this.newLog)
    }

    addItem(componente: string, item: any): void {

        console.log("add itemcomponent", item,)

        this.storageService.addItem(componente, item)
    }

}