import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastService } from 'src/app/core/services/toast.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form!: UntypedFormGroup;
  hideCurrentPassword: boolean;
  hideNewPassword: boolean;
  currentPassword!: string;
  newPassword!: string;
  newPasswordConfirm!: string;
  disableSubmit!: boolean;

  constructor(private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private toastService: ToastService) {
    this.hideCurrentPassword = true;
    this.hideNewPassword = true;
  }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      currentPassword: new UntypedFormControl('', Validators.required),
      newPassword: new UntypedFormControl('', Validators.required),
      newPasswordConfirm: new UntypedFormControl('', Validators.required),
    });

    this.form.get('currentPassword')?.valueChanges
      .subscribe(val => { this.currentPassword = val; });

    this.form.get('newPassword')?.valueChanges
      .subscribe(val => { this.newPassword = val; });

    this.form.get('newPasswordConfirm')?.valueChanges
      .subscribe(val => { this.newPasswordConfirm = val; });

    this.spinnerService.visibility.subscribe((value) => {
      this.disableSubmit = value;
    });
  }

  changePassword() {

    if (this.newPassword !== this.newPasswordConfirm) {
      this.toastService.error('New passwords do not match.');
      return;
    }

    const email = this.authService.getCurrentUser().email;

    this.authService.changePassword(email, this.currentPassword, this.newPassword)
      .subscribe(
        data => {
          this.form.reset();
          this.toastService.success('Your password has been changed.');
        },
        error => {
          this.toastService.error(error.error);
        }
      );
  }
}
