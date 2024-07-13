import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  private email!: string;
  form!: UntypedFormGroup;
  loading!: boolean;

  constructor(private authService: AuthenticationService,
    private toastService: ToastService,
    private titleService: Title
    , private authenticationService: AuthenticationService
    , public dialogRef: MatDialogRef<PasswordResetRequestComponent>
    ,private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('GT20 - Password Reset Request');

    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email])
    });

    this.form.get('email')?.valueChanges
      .subscribe((val: string) => { this.email = val.toLowerCase(); });
  }

  resetPassword() {
    this.loading = true;
    this.authService.passwordResetRequest(this.email)
      .subscribe(
        results => {
          //this.router.navigate(['/auth/login']);
          this.toastService.success('Password verification mail has been sent to your email address.');
          this.dialogRef.close(false);
          this.authenticationService.loginPopup();
          
        },
        error => {
          this.loading = false;
          this.toastService.error(error.error);
        }
      );
  }

  cancel() {
    this.dialogRef.close(false);
    this.authenticationService.loginPopup();
    //this.router.navigate(['/']);
  }
}
