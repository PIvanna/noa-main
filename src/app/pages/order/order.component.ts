import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../shared/services/account/account.service';
import { Router } from '@angular/router';
import { IUserInfo } from '../../shared/interfaces/user-info/user-info.interface'; // Make sure IOrder is imported
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { OrderService } from '../../shared/services/order/order.service';
import { IOrder } from '../../shared/interfaces/order/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  public personalForm!: FormGroup;
  public addressForm!: FormGroup;
  public selfForm!: FormGroup;
  public basketEmpty = true;
  public total = 0;
  public basket: Array<IProductResponse> = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private orderService: OrderService,
  ) {
    this.checkFormType();
    this.login();
  }

  public currentUser: IUserInfo = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: [],
    orders: [],
    uid: ''
  };

  ngOnInit(): void {
    this.initPersonalForm();
    this.initaddressForm();
    this.initselfForm();
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      if (this.basket.length > 0) {
        this.basketEmpty = false;
      }
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
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

  delete(product: IProductResponse): void {
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
  }

  login(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      this.currentUser = JSON.parse(currentUserString);
    } else {
      this.currentUser.firstName = null;
      this.currentUser.lastName = null;
      this.currentUser.phoneNumber = null;
      this.currentUser.email = null;
    }
  }

  initPersonalForm(): void {
    this.personalForm = this.fb.group({
      firstName: [this.currentUser.firstName, [Validators.required]],
      lastName: [this.currentUser.lastName, [Validators.required]],
      phoneNumber: [this.currentUser.phoneNumber],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
    });
  }

  initaddressForm(): void {
    const deliveryData = localStorage.getItem('deliveryData');
    if (deliveryData) {
      const parsedData = JSON.parse(deliveryData);
      this.addressForm = this.fb.group({
        type: ['Доставка', Validators.required],
        city: [parsedData.city, Validators.required],
        adress: [parsedData.adress, Validators.required],
        house: [parsedData.house, Validators.required]
      });
    }
  }

  initselfForm(): void {
    const selfData = localStorage.getItem('selfData');
    if (selfData) {
      const parsedData = JSON.parse(selfData);
      this.selfForm = this.fb.group({
        type: ['Самовивіз', Validators.required],
        restaurant: [parsedData.restaurant, Validators.required]
      });
    }
  }

  public formType: 'Доставка' | 'Самовивіз' | null = null;
  public addressType = '';
  public selfType = '';
  checkFormType(): void {
    const deliveryData = localStorage.getItem('deliveryData');
    const selfData = localStorage.getItem('selfData');
    if (deliveryData) {
      this.formType = 'Доставка';
      this.addressType = this.formType;
      this.selfType = '';
    } else if (selfData) {
      this.formType = 'Самовивіз';
      this.selfType = this.formType;
      this.addressType = '';
    } else {
      this.formType = null;
    }
  }

  async orderProduct(): Promise<void> {
    if (this.personalForm.valid && !this.basketEmpty &&
       ((this.formType === 'Доставка' && this.addressForm.valid) ||
        (this.formType === 'Самовивіз' && this.selfForm.valid))) {

      const orderNumber = Math.floor(Math.random() * 1000000);
      const orderDate = new Date();
      const address = this.formType === 'Доставка' ? this.addressForm.value : this.selfForm.value;
      const newOrder: IOrder = {
        orderNumber,
        date: orderDate,
        address,
        total: this.total,
        status: 'Виконано'
      };

      const userEmail = this.personalForm.get('email')!.value;

      if (this.currentUser.email === userEmail) {
        if (!this.currentUser.orders) {
          this.currentUser.orders = [];
        }
        this.currentUser.orders.push(newOrder);
        await this.accountService.updateFirebase(this.currentUser, this.currentUser.uid);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        this.clearBasket();

        this.router.navigate(['/']);
      } else {
        alert('Email addresses do not match.');
      }
    } else {
      alert('Please fill in all required fields and ensure your basket is not empty.');
    }
  }
}
