import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['']);
  }
}
