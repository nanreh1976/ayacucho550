import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PlayaI } from 'src/app/interfaces/playaI';

@Injectable({
  providedIn: 'root'
})
export class DbFirestoreService {

  componente: string = ''

  private dataCollection: CollectionReference<DocumentData>;
  private estacionamiento1Collection!: CollectionReference<DocumentData>;
  

  constructor(private readonly firestore: Firestore) {
    this.dataCollection = collection(this.firestore, 'data');
    //this.estacionamiento1Collection = collection(this.firestore, `/estacionamiento/datos/${this.componente}`);
  }

  /* getAll(componente:string) {
    return collectionData(collection(this.firestore, componente), {
      idField: 'id',
    }) as Observable<any[]>;
  }
  

  get(id: string) {
    const dataDocumentReference = doc(this.firestore, `data/${id}`);
    return docData(dataDocumentReference, { idField: 'id' });
  }

  create(componente:string, item: any) {
    console.log(item);
    
    return addDoc(collection(this.firestore, componente), item);
  }

  update(componente:string, item: any) {
    const dataDocumentReference = doc(
      this.firestore,
      `${componente}/${item.id}`
    );
    return updateDoc(dataDocumentReference, { ...item });
  }

  delete(componente:string, id: string) {
    const dataDocumentReference = doc(this.firestore, `${componente}/${id}`);
    return deleteDoc(dataDocumentReference);
  } */
  getAll(componente:string) {
    this.estacionamiento1Collection = collection(this.firestore, `/estacionamiento/datos/${componente}`);
    return collectionData(this.estacionamiento1Collection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  get(id: string) {
    const estacionamiento1DocumentReference = doc(this.firestore, `/estacionamiento/datos/${id}`);
    return docData(estacionamiento1DocumentReference, { idField: 'id' });
  }

  create(componente:string, item: any) {
    this.estacionamiento1Collection = collection(this.firestore, `/estacionamiento/datos/${componente}`);
    return addDoc(this.estacionamiento1Collection, item);
  }

  update(componente: string, item: any) {
    //this.estacionamiento1Collection = collection(this.firestore, `/estacionamiento/datos/${componente}`);
    const estacionamiento1DocumentReference = doc(
      this.firestore,
      `/estacionamiento/datos/${componente}/${item.id}`
    );
    return updateDoc(estacionamiento1DocumentReference, { ...item });
  }

  delete(componente:string, id: string) {
    //this.estacionamiento1Collection = collection(this.firestore, `/estacionamiento/datos/${componente}`);
    const estacionamiento1DocumentReference = doc(this.firestore, `/estacionamiento/datos/${componente}/${id}`);
    return deleteDoc(estacionamiento1DocumentReference);
  }
}
