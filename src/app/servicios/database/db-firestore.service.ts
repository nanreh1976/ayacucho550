import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PlayaI } from 'src/app/interfaces/playaI';

@Injectable({
  providedIn: 'root'
})
export class DbFirestoreService {

  coleccion: string = '';
  componente: string = '';


  constructor(private readonly firestore: Firestore, private firestore2: AngularFirestore) {

  }


  getAll(componente:string) {
    let dataCollection = collection(this.firestore, `/${this.coleccion}/datos/${componente}`);
        
    return collectionData(dataCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }


  getAll2(componente:string) {
    let dataCollection = `/${this.coleccion}/datos/${componente}`;
    return this.firestore2.collection(dataCollection).snapshotChanges();
  }
  

  getAllSorted(componente:string) {
    let dataCollection = `/${this.coleccion}/datos/${componente}`;
    return this.firestore2.collection(dataCollection, ref => ref.orderBy('fecha','desc')).snapshotChanges(); }

    // this.firestore.collection('Employees', ref => ref.orderBy('name', 'desc'))

  get(id: string) {
    const estacionamiento1DocumentReference = doc(this.firestore, `/${this.coleccion}/datos/${id}`);
    return docData(estacionamiento1DocumentReference, { idField: 'id' });
  }

  create(componente:string, item: any) {
    let dataCollection = collection(this.firestore, `/${this.coleccion}/datos/${componente}`);
    return addDoc(dataCollection, item);
  }

  update(componente: string, item: any) {
    //this.dataCollection = collection(this.firestore, `/estacionamiento/datos/${componente}`);
    const estacionamiento1DocumentReference = doc(
      this.firestore,
      `/${this.coleccion}/datos/${componente}/${item.id}`
    );
    return updateDoc(estacionamiento1DocumentReference, { ...item });
  }

  delete(componente:string, id: string) {
    //this.dataCollection = collection(this.firestore, `/estacionamiento/datos/${componente}`);
    const estacionamiento1DocumentReference = doc(this.firestore, `/${this.coleccion}/datos/${componente}/${id}`);
    return deleteDoc(estacionamiento1DocumentReference);
  }

  getUsuarioUid(id:string) {
    const estacionamiento1DocumentReference = doc(this.firestore, `/users/${id}`);    
    return docData(estacionamiento1DocumentReference, { idField: 'id' });
  }

  setearColeccion(coleccion:string) {
    this.coleccion = coleccion;
    console.log("esto es el servicio db. coleccion: ", this.coleccion);
    
  }

  getTodo(){
    let dataCollection = collection(this.firestore, `/datos/`);
    
    return collectionData(dataCollection, {
      idField: 'id',
    }) as Observable<any[]>
  }
}
