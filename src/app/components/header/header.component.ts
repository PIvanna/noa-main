import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthdialogComponent } from '../authdialog/authdialog.component';
import { ROLE } from 'src/app/shared/constants/constants';
import { MenuComponent } from '../menu/menu.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { BasketComponent } from '../basket/basket.component';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { DeliveryComponent } from '../delivery/delivery.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isLogin = false;
  public loginUrl = '';
  public total = 0;
  public basket: Array<IProductResponse> = [];
  public basketOpen = false;
  public basketEmpty = true;
  public name = '';
  public formType: 'Доставка' | 'Самовивіз' | null = null; // Variable to store the form type

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.loadBasket();
    this.updateBasket();
    this.checkFormType();
  }

  ngOnInit(): void {
    this.checkUpdatesUserLogin();
    this.checkUserLogin();
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket(); // Оновлюємо кошик при змінах
    });
  }

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
    window.location.reload();
    this.name = '';
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    });
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.name = currentUser.firstName;
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet/user-info';
      this.name = currentUser.firstName;
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.name = '';
    }
  }

  openLoginDialog(): void {
    if (!this.isLogin) {
      this.dialog.open(AuthdialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog',
        autoFocus: false
      }).afterClosed().subscribe(result => { });
    }
  }

  openMenuDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      top: '117px'
    };
    dialogConfig.panelClass = 'menu-dialog';

    this.dialog.open(MenuComponent, dialogConfig);
  }

  openMainMenuDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      right: '0'
    };
    dialogConfig.panelClass = 'main-menu-dialog';

    this.dialog.open(MainMenuComponent, dialogConfig);
  }

  openDeliveryDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'delivery-dialog';
    dialogConfig.disableClose = true; // Діалог не закривається при кліку за межами

    this.dialog.open(DeliveryComponent, dialogConfig);

  }

  openBasketDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      right: '0'
    };
    dialogConfig.panelClass = 'basket-dialog';

    this.dialog.open(BasketComponent, dialogConfig);
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
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  checkFormType(): void {
    const deliveryData = localStorage.getItem('deliveryData');
    const selfData = localStorage.getItem('selfData');

    if (deliveryData) {
      this.formType = 'Доставка';
    } else if (selfData) {
      this.formType = 'Самовивіз';
    } else {
      this.formType = null;
      this.openDeliveryDialog(); // Open delivery dialog if no data is found
    }
  }
}
