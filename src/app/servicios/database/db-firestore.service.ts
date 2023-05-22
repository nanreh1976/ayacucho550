import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbFirestoreService {
  coleccion: string = '';
  componente: string = '';

  constructor(
    private readonly firestore: Firestore,
    private firestore2: AngularFirestore
  ) {}

  getAll(componente: string) {
    let dataCollection = collection(
      this.firestore,
      `/${this.coleccion}/datos/${componente}`
    );

    return collectionData(dataCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  getAllSortedToday(componente: any, campo: any, orden: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la fecha al comienzo del día
  
    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setDate(endOfDay.getDate() + 1); // Establecer el final del día sumando un día
  
    let dataCollection = `/${this.coleccion}/datos/${componente}`;
  
    return this.firestore2
      .collection(dataCollection, (ref) =>
        ref
          .where(campo, '>=', startOfDay)
          .where(campo, '<', endOfDay)
          .orderBy(campo, orden)
          .limit(10)
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        tap((data) => {
          // console.log(`Total documents read: ${data.length}`, componente);
        })
      );
  }

  // GET ALL ORDENADO POR CAMPO Y ORDEN
  getAllSorted(componente: string, campo: string, orden: any) {
    // campo debe existir en la coleccion, si esta anidado pasar ruta separada por puntso (field.subfield)
    // orden solo asc o desc

    let dataCollection = `/${this.coleccion}/datos/${componente}`;

    return this.firestore2
      .collection(dataCollection, (ref) => ref.orderBy(campo, orden))
      .valueChanges({ idField: 'id' });
  }

  // this.firestore.collection('Employees', ref => ref.orderBy('name', 'desc'))
  // this.firestore.collection('Employees', ref => ref.orderBy('name', 'desc'))

  getByFieldValue(componente: string, campo: string, value: string) {
    // devuelve los docs  de la coleccion que tengan un campo con un valor determinado
    // campo debe existir en la coleccion, si esta anidado pasar ruta separada por puntso (field.subfield)
    // orden solo asc o desc

    let dataCollection = `/${this.coleccion}/datos/${componente}`;
    return this.firestore2
      .collection(dataCollection, (ref) => ref.where(campo, '==', value))
      .valueChanges({ idField: 'id' });
  }

  getUsersByColecion() {
    // devuelve los docs  de la coleccion que tengan un campo con un valor determinado
    // campo debe existir en la coleccion, si esta anidado pasar ruta separada por puntso (field.subfield)
    // orden solo asc o desc

    // let dataCollection = `/${this.coleccion}/datos/${componente}`;
    return this.firestore2
      .collection('users', (ref) =>
        ref.where('coleccion', '==', this.coleccion)
      )
      .valueChanges({ idField: 'id' });
  }

  get(id: string) {
    const estacionamiento1DocumentReference = doc(
      this.firestore,
      `/${this.coleccion}/datos/${id}`
    );
    return docData(estacionamiento1DocumentReference, { idField: 'id' });
  }

  create(componente: string, item: any) {
    let dataCollection = collection(
      this.firestore,
      `/${this.coleccion}/datos/${componente}`
    );
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

  delete(componente: string, id: string) {
    //this.dataCollection = collection(this.firestore, `/estacionamiento/datos/${componente}`);
    const estacionamiento1DocumentReference = doc(
      this.firestore,
      `/${this.coleccion}/datos/${componente}/${id}`
    );
    return deleteDoc(estacionamiento1DocumentReference);
  }

  getUsuarioUid(id: string) {
    const estacionamiento1DocumentReference = doc(
      this.firestore,
      `/users/${id}`
    );
    return docData(estacionamiento1DocumentReference, { idField: 'id' });
  }

  setearColeccion(coleccion: string) {
    this.coleccion = coleccion;
  }

  getTodo() {
    let dataCollection = collection(this.firestore, `/datos/`);

    return collectionData(dataCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  async moveDocsToSubcollection(componenteA: string, componenteB: string, field: string, string: string) {
    const collectionRef = this.firestore2.collection(`${this.coleccion}/datos/${componenteA}`);
    const query = collectionRef.ref.where(field, '==', string);
    const querySnapshot = await query.get();
  
    const batch = this.firestore2.firestore.batch();
  
    querySnapshot.forEach((doc) => {
      const newDocRef = this.firestore2.collection(`${this.coleccion}/datos/${componenteB}/${doc.id}`).doc();
      batch.set(newDocRef.ref, doc.data());
      batch.delete(doc.ref); // deletes the original document from componenteA
    });
  
    await batch.commit();
  }
  
}
