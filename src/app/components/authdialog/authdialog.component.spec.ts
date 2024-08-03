import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthdialogComponent } from './authdialog.component';
import {Auth} from '@angular/fire/auth';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Firestore} from '@angular/fire/firestore';

describe('AuthdialogComponent', () => {
  let component: AuthdialogComponent;
  let fixture: ComponentFixture<AuthdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthdialogComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(AuthdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error if password confirmation does not match', () => {
    component.initAuthForm(); // Ініціалізуємо форму
    const matchError = { matchError: 'Password confirmation doesnt match' };
    const password = component.authForm.controls['password'];
    const confirmed = component.authForm.controls['passwordRepeat'];
    password.setValue('password123');
    confirmed.setValue('differentPassword');
    component.checkConfirmedPassword();
    expect(component.checkPassword).toBeTrue();
    expect(component.authForm.controls['passwordRepeat'].hasError('matchError')).toBeFalse();
  });


  it('should not set error if password confirmation matches', () => {
    component.initAuthForm(); // Ініціалізуємо форму
    const password = component.authForm.controls['password'];
    const confirmed = component.authForm.controls['passwordRepeat'];
    password.setValue('password123');
    confirmed.setValue('password123');
    component.checkConfirmedPassword();
    expect(component.checkPassword).toBeTrue();
    expect(component.authForm.controls['passwordRepeat'].hasError('matchError')).toBeFalse();
  });

  it('should toggle isLogin and isRegister flags', () => {
    component.isLogin = true;
    component.isRegister = false;
    component.changeIsLogin();
    expect(component.isLogin).toBeFalse();
    expect(component.isRegister).toBeTrue(); // Очікуємо, що isRegister зміниться на протилежне значення
  });

  it('should register user and reset form if input is valid', async () => {
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      email: 'test@example.com',
      password: 'password123',
      passwordRepeat: 'password123'
    });
    spyOn(component, 'emailSignUp').and.returnValue(Promise.resolve());
    component.registerUser();
    await fixture.whenStable();
    expect(component.emailSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(component.isLogin).toBeTrue();
    expect(component.registerForm.value).toEqual({
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      password: null,
      passwordRepeat: null
    });
  });

  it('should reset the form after successful login', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const passwordRepeat = 'password123';
    spyOn(component, 'login').and.returnValue(Promise.resolve());
    component.authForm.setValue({ firstName: 'John', lastName: 'hi', phoneNumber: 'hi', email, password, passwordRepeat }); // Додали firstName
    component.loginUser();
    await fixture.whenStable();
    expect(component.login).toHaveBeenCalledWith(email, password);
    expect(component.authForm.value).toEqual({ firstName: null, lastName: null, phoneNumber: null, email: null, password: null, passwordRepeat: null }); // Вказали значення для firstName
  });






});
