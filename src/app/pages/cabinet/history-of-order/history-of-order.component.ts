import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-of-order',
  templateUrl: './history-of-order.component.html',
  styleUrls: ['./history-of-order.component.scss']
})
export class HistoryOfOrderComponent {
  public orders: any[] = []; // Use proper type if known

  constructor(
    private router: Router
  ) {
    this.initOrder();
  }
 
  initOrder() {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    if (currentUser && currentUser.orders) {
      this.orders = currentUser.orders.map((order: any) => {
        // Конвертуємо дати з рядків в об'єкти Date
        if (order.date) {
          order.date = new Date(order.date);
        }
        return order;
      });
    } else {
      this.orders = [];
    }
  }

  formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date); // Конвертуємо рядок в об'єкт Date
    }
  
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      // Перевіряємо, чи це дійсно об'єкт Date і чи є він дійсним
      return 'Invalid date';
    }
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  }
  
}
