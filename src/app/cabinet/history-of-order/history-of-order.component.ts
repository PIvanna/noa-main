import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-history-of-order',
  templateUrl: './history-of-order.component.html',
  styleUrls: ['./history-of-order.component.scss']
})
export class HistoryOfOrderComponent {
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
  }

  public orders = [];

  initOrder() {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    if (currentUser && currentUser.orders) {
      this.orders = currentUser.orders;
    } else {
      this.orders = [];
    }
  }




}
