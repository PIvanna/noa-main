import { HttpClient } from '@angular/common/http';
import {Injectable, Query} from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import { map, Observable } from 'rxjs';

import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  docData,
  query, where,
  QueryConstraint // Змінено where на query
} from "@angular/fire/firestore";
import { DocumentData, collection } from "@firebase/firestore"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore,
  ) {
    this.productCollection = collection(this.afs, 'products');
  }

  // Оновлений метод для отримання продуктів за назвою категорії

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(categoryDocumentReference, { ...product });
  }

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

  getOneFirebase(id: string | null) {
    const categoryDocumentReference = doc(this.afs, `products/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

}
