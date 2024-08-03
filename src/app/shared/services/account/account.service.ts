import { HttpClient } from '@angular/common/http';
import {Injectable, Query} from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import { map, Observable, Subject } from 'rxjs';

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
import { DocumentData, collection } from "@firebase/firestore";
import { IUserInfo } from '../../interfaces/user-info/user-info.interface';
import { Auth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();

  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/users` };
  private usersCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore,
    private auth: Auth
  ) {
    this.usersCollection = collection(this.afs, 'users');
  }

  // // Оновлений метод для отримання продуктів за назвою категорії

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    }
  }

  getAllFirebase() {
    return collectionData(this.usersCollection, { idField: 'id' });
  }

  createFirebase(product: IUserInfo) {
    return addDoc(this.usersCollection, product);
  }

  updateFirebase(product: IUserInfo, id: string) {
    const categoryDocumentReference = doc(this.afs, `users/${id}`);
    return updateDoc(categoryDocumentReference, { ...product });
  }

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `users/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

  getOneFirebase(id: string | null) {
    const categoryDocumentReference = doc(this.afs, `users/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  
  logout(): void {
    localStorage.removeItem('currentUser');
    this.isUserLogin$.next(false);
  }
}
