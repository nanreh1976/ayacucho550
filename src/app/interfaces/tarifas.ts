export interface Tarifas {
  id:number;
  nombre: string;               // nombre de la tarifa 
  categoria: string;            // tipo de vehiculo
  fraccion: number;             // fraccion minima de facturacion
  unidad_tiempo: string;        // minutos, horas, dias, semanas, mes
  valor: number;                
  tolerancia: number;           // rango de tolerancia
}