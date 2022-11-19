import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PlayaI } from 'src/app/interfaces/playaI';

@Injectable({
  providedIn: 'root'
})
export class DbFirestoreService {

  private dataCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.dataCollection = collection(this.firestore, 'data');
  }

  getAll(componente:string) {
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
  }
}
