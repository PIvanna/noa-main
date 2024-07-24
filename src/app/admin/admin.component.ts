import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['']);
  }
}
