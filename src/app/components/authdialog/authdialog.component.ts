import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ROLE } from 'src/app/shared/constants/constants';
import { Subscription } from 'rxjs';

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat?: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-authdialog',
  templateUrl: './authdialog.component.html',
  styleUrls: ['./authdialog.component.scss']
})
export class AuthdialogComponent {
  public authForm!: FormGroup;
  public registerForm!: FormGroup;
  public isLogin = false;
  public checkPassword = false;
  private registerData!: IRegister;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthdialogComponent>
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegisterForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      passwordRepeat: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.authForm.reset();
    }).catch(e => {
      alert(e);
    });
  }

  private userDataSubscription: Subscription | undefined;

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
    this.userDataSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const cur = { ...user };
      const currentUser = { ...user, uid: credential.user.uid };
      if (user && cur['role'] === ROLE.USER) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.router.navigate(['/cabinet/user-info']);
      } else if (user && cur['role'] === ROLE.ADMIN) {
        // Handle admin navigation
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    });
  }

  public isRegister = true;

  registerUser(): void {
    const { email, password } = this.registerForm.value;
    this.registerData = this.registerForm.value;
    if (this.registerForm.get('password')!.value !== this.registerForm.get('passwordRepeat')!.value) {
      this.registerForm.get('passwordRepeat')!.setErrors({ passwordMismatch: true });
      console.log("Passwords do not match");
      return;
    }

    if (this.registerForm.valid) {
      this.emailSignUp(email, password).then(() => {
        console.log('Registration successful, navigating to cabinet');
        this.isLogin = !this.isLogin;
        this.registerForm.reset();
      }).catch(e => {
        alert(e);
      });
    }
  }

  async emailSignUp(email: string, password: string): Promise<void> {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = {
        email: credential.user.email,
        firstName: this.registerData.firstName,
        lastName: this.registerData.lastName,
        phoneNumber: this.registerData.phoneNumber,
        address: [],
        orders: [],
        role: 'USER'
      };
      await setDoc(doc(this.afs, 'users', credential.user.uid), user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.dialogRef.close();
      this.router.navigate(['/cabinet/user-info']).then(() => {
        location.reload();
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already in use. Please use a different email.');
      } else {
        console.error('Error signing up:', error);
        alert('Error signing up. Please try again.');
      }
      // Redirect to the homepage if there is an error
      this.dialogRef.close();
      this.router.navigate(['/']);
    }
  }
  

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
    this.isRegister = !this.isRegister;
  }

  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.registerForm.controls['passwordRepeat'].setErrors({
        matchError: 'Password confirmation doesn\'t match'
      });
    }
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }

  get confirmed(): AbstractControl {
    return this.registerForm.controls['passwordRepeat'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registerForm.controls[control].errors?.[name];
  }
}
