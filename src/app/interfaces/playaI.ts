import { Fechas } from "./fechas";
import { Tarifas } from "./tarifas";

export interface PlayaI {

    /* id: any; */
    patente: string;
    fechas: Fechas;
    tarifa: Tarifas;
    descripcion: string;
    saldo: number;
    codigoBarras: string;

}
