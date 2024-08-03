import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from '@angular/fire/auth';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  public passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.initPasswordForm();
  }

  initPasswordForm(): void {
    this.passwordForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: [null, [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')!.value;
    const confirmNewPassword = form.get('confirmNewPassword')!.value;
    return newPassword === confirmNewPassword ? null : { passwordMismatch: true };
  }

  async changePassword(): Promise<void> {
    if (this.passwordForm.valid) {
      const user = this.auth.currentUser;
      if (user) {
        const { currentPassword, newPassword } = this.passwordForm.value;
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);

        try {
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, newPassword);
          alert('Password changed successfully.');
          this.router.navigate(['/cabinet/user-info']);
        } catch (error) {
          console.error('Error changing password:', error);
          alert('Error changing password. Please try again.');
        }
      }
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}
