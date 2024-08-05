import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public basketEmpty = true;
  public total = 0;
  public basket: Array<IProductResponse> = [];

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<BasketComponent>
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    const basketFromStorage = localStorage.getItem('basket');
    if (basketFromStorage) {
      this.basket = JSON.parse(basketFromStorage);
      this.basketEmpty = this.basket.length === 0;
      this.getTotalPrice();
    } else {
      this.basketEmpty = true;
    }
  }

  getTotalPrice(): void {
    console.log('Calculating total price...');
    
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + (prod.count || 0) * (prod.price || 0), 0);
    console.log('Total price:', this.total);
  }
  
  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  productCount(product: IProductResponse, increment: boolean): void {
    if (increment) {
      product.count = (product.count || 1) + 1;
    } else if (product.count && product.count > 1) {
      product.count -= 1;
    }
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.getTotalPrice();
    this.orderService.notifyChangeBasket(); // Notify basket change
  }

  delete(product: IProductResponse) {
    this.basket = this.basket.filter(item => item.id !== product.id);
    this.updateLocalStorage();
    this.basketEmpty = this.basket.length === 0;
  }

  clearBasket(): void {
    this.basket = [];
    this.basketEmpty = true;
    localStorage.removeItem('basket');
    this.orderService.notifyChangeBasket();
    this.getTotalPrice();
    this.dialogRef.close();
    window.location.reload();
  }

  closeWindow() {
    this.dialogRef.close();
  }
}
