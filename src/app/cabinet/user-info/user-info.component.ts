import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserInfo } from 'src/app/shared/interfaces/user-info/user-info.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  public personalForm!: FormGroup;
  public currentUser: IUserInfo = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '', 
    address: [],
    orders: []
  };
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.login();
  }

  ngOnInit(): void {
    this.initPersonalForm();
  }

  initPersonalForm(): void {
    this.personalForm = this.fb.group({
      firstName: [this.currentUser.firstName, [Validators.required]],
      lastName: [this.currentUser.lastName, [Validators.required]],
      phoneNumber: [this.currentUser.phoneNumber],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
    })
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

  saveChange(): void {
    console.log('h9');

    if (this.personalForm.valid) {
      const updatedUserInfo: IUserInfo = this.personalForm.value;
      const currentUserString = localStorage.getItem('currentUser');
      const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

      if (currentUser && currentUser.uid) { // Ensure the user ID is available
        const userId = currentUser.uid;
        console.log(currentUser.uid);
        this.accountService.updateFirebase(updatedUserInfo, userId)
          .then(() => {
            // Update localStorage if you store user data there
            const updatedCurrentUser = { ...currentUser, ...updatedUserInfo };
            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
          })
          .catch(error => {
            console.error('Error updating user info:', error);
          });
      }
    }
  }


  addAddress() {

  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['']);
  }
}
