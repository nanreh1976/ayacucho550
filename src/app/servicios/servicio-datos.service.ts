import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ServicioDatosService {

  xpUrl = 'api/xp';    //url de la api, usar la verdadera con el server
  
  tarifasUrl = 'api/tarifas';    //url de la api, usar la verdadera con el server

  urlApi:string ='api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }



  /** menejo de errores en el htttp y que la app no se cuelgue
 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // metodos CRUD GENERALES

  getAll(componente: string): Observable<[]> {


    let url: string = `${this.urlApi}/${componente}`;
     console.log("get all service", url)
    return this.http.get<[]>(url).pipe(
      tap(data => localStorage.setItem(`${componente}`, JSON.stringify(data))    ),
      catchError(this.handleError<[]>('getAll', []))
    );
  };


  //  GET item por id. con 404 si no se encuentra 
  getItem(componente: string, id: number): Observable<any> {
    let urla: string = `${this.urlApi}/${componente}`;
    let urlb = `${urla}/${id}`;
    return this.http.get<any>(urlb).pipe(
      // tap(data => console.log(data)),
      catchError(this.handleError<any>(`getItem id=${id}`))
    );
  }

  // PUT: modificar el item en el sserver 
  updateItem(componente: string, item: any, id: number): Observable<any> {

    let urla: string = `${this.urlApi}/${componente}`;
    let urlb = `${urla}/${id}`;
    // console.log("service put", urlb, id)
    return this.http.put(urlb, item, this.httpOptions).pipe(
      // tap(_ => console.log(`item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  deleteItem(componente: string, id: any): Observable<any> {
    let url: string = `${this.urlApi}/${componente}/${id}`;
    // let urlb = `${urla}/${id}`;
    // console.log("delete item from service", url, id)
    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted item id=${id}`)),
      catchError(this.handleError('deleteItem'))
    );
  }
  



  addItem(componente: string, item: any): Observable<any> {

    // persona seteada en uno hasta implementar registro de usuarios
    let url: string = `${this.urlApi}/${componente}`;
    // console.log("por enviar a api additem", url, item)
    return this.http.post<any>(url, item, this.httpOptions).pipe(
      tap((newitem: any) => console.log('se agrego nuevo item a', componente)),
      catchError(this.handleError<any>('addItem'))
    );
  }


  



  getTarifas(): Observable<[]> {
    return this.http.get<[]>(this.tarifasUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError<[]>('getTarifas', []))
    );
  };

}

