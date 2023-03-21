export interface Tarifas {
  id:number;
  nombre: string;               // nombre de la tarifa 
  vehiculo: string;             // tipo de vehiculo
  categoria: string;            // tipo de tarifa
  fraccion: any;             // fraccion minima de facturacion
  unidad_tiempo: string;        // minutos, horas, dias, semanas, mes
  valor: any;                
  tolerancia: any;           // rango de tolerancia
}