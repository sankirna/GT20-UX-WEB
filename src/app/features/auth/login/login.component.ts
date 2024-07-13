import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: UntypedFormGroup;
    loading!: boolean;

    constructor(private router: Router,
        private toastService: ToastService,
        private authenticationService: AuthenticationService,
        private shoppingCartService: ShoppingCartService,
        public dialogRef: MatDialogRef<LoginComponent>) {
    }

    ngOnInit() {
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(savedUserEmail, [Validators.required]),
            password: new UntypedFormControl('', Validators.required),
            rememberMe: new UntypedFormControl(savedUserEmail !== null),
            userTypeId: new UntypedFormControl(1)
        });
    }

    login() {
        const email = this.loginForm.get('email')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;

        this.loading = true;
        this.authenticationService
            .login(this.loginForm.getRawValue())
            .subscribe(
                data => {
                    if (rememberMe) {
                        localStorage.setItem('savedUserEmail', email);
                    } else {
                        localStorage.removeItem('savedUserEmail');
                    }
                    this.shoppingCartService.get().subscribe(
                        (response) => {
                            this.shoppingCartService.setShoppingCartModel(response);
                        },
                        (error) => {
                            console.error(error);
                        }
                    );;
                    this.onConfirm();
                    //this.router.navigate(['/']);
                },
                error => {
                    this.toastService.error(error.error.title);
                    this.loading = false;
                }
            );
    }

    resetPassword() {
        this.onDismiss();
        this.authenticationService.resetPassword();
    }

    onConfirm(): void {
        if (this.dialogRef) {
            this.dialogRef.close(true);
        }
    }

    onDismiss(): void {
        if (this.dialogRef) {
            this.dialogRef.close(false);
        }
    }

    register() {
        this.onDismiss();
        this.authenticationService.userRegister();
    }
}



/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class LoginComponentDialogModel {

    constructor() {
    }
}

export class RegisterComponentDialogModel {

    constructor() {
    }
}

export class ResetPassowrdComponentDialogModel {

    constructor() {
    }
}