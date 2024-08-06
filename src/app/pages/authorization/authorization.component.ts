import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/constants';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  public authForm!: FormGroup;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginAdmin(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
    }).catch(e => {
      alert(e)
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    const userDocRef = doc(this.afs, 'users', credential.user.uid);
    const user$: Observable<any> = docData(userDocRef);
    console.log(credential.user)
    user$.subscribe(user => {
      if (user) {
        const curRole = user.role;
        console.log(curRole);

        const currentUser = { ...user, uid: credential.user.uid };
        if (curRole === ROLE.USER) {
        } else if (curRole === ROLE.ADMIN) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.router.navigate(['/admin']);
        }
        this.accountService.isUserLogin$.next(true);
      } else {
        console.log('User data is undefined');
      }
    }, (e) => {
      console.log('error', e);
    });
  }
}
