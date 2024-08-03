import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthdialogComponent } from '../authdialog/authdialog.component';
import { ROLE } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public basketCount = 0;

  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.checkUpdatesUserLogin();
    this.checkUserLogin();
  }

  public isLogin = false;
  public loginUrl = '';

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
    })
  }

  public name = '';

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
    if(!this.isLogin){
      this.dialog.open(AuthdialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog',
        autoFocus: false
      }).afterClosed().subscribe(result => {
      })
    }
  }
}
