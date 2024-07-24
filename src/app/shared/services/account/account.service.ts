import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();

  constructor() { }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isUserLogin$.next(false);
  }
}
