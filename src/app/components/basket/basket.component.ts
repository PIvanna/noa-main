import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
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
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      if (this.basket.length > 0) {
        this.basketEmpty = false;
      } else {
        this.dialogRef.close();
      }
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.updateLocalStorage();
  }

  updateLocalStorage(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.getTotalPrice();
    this.orderService.notifyChangeBasket(); // Сповіщення про зміну кошика
  }

  delete(product: IProductResponse) {
    const index = this.basket.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.basket.splice(index, 1);
      this.updateLocalStorage();
      this.updateBasket();
    }
    if (this.basket.length == 0) {
      this.basketEmpty = true;
    }
  }

  clearBasket(): void {
    this.basket = [];
    this.basketEmpty = true;
    this.updateLocalStorage();
    localStorage.removeItem('basket');
    this.orderService.notifyChangeBasket();
    this.dialogRef.close();
  }

  closeWindow() {
    this.dialogRef.close();
  }
}
