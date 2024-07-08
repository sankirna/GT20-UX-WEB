import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { of, EMPTY, Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent, LoginComponentDialogModel, RegisterComponentDialogModel, ResetPassowrdComponentDialogModel } from 'src/app/features/auth/login/login.component';
import { NotificationService } from './notification.service';
import { UserRegisterComponent } from 'src/app/features/auth/user-register/user-register.component'; 
import { PasswordResetRequestComponent } from 'src/app/features/auth/password-reset-request/password-reset-request.component';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage,
        private dialog: MatDialog, 
        private notificationService: NotificationService) {
    }

    loginPopup(){
        const dialogData = new LoginComponentDialogModel();
        const dialogRef = this.dialog.open(LoginComponent, {
          data: dialogData
        });
    
        dialogRef.afterClosed().subscribe(dialogResult => {
          if(dialogResult){
              this.notificationService.openSnackBar('User has been succefully logged in!');
          }else{
          }
        });
      }

    login(user: any) {
        const api = 'Authenticate/login';
        return this.http.post<any>(api, user)
            .pipe(delay(1000),
                map((response) => {
                    // set token property
                    // const decodedToken = jwt_decode(response['token']);
                    // store email and jwt token in local storage to keep user logged in between page refreshes
                    this.localStorage.setItem('web-currentUser', JSON.stringify({
                        token: response.token,
                        user: response.user,
                        isAdmin: true,
                        email: user.email,
                        id: user.id,
                        alias: user.email.split('@')[0],
                        expiration: moment().add(1, 'days').toDate(),
                        fullName: user.email
                    }));

                    return true;
                }));
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('web-currentUser');
       // this.shoppingCartService.clearShoppingCartModel();
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        let user = this.localStorage.getItem('web-currentUser');
        return user ? JSON.parse(user) : null;
        // return {
        //     token: 'aisdnaksjdn,axmnczm',
        //     isAdmin: true,
        //     email: 'john.doe@gmail.com',
        //     id: '12312323232',
        //     alias: 'john.doe@gmail.com'.split('@')[0],
        //     expiration: moment().add(1, 'days').toDate(),
        //     fullName: 'John Doe'
        // };
    }

    passwordResetRequest(email: string) {
        return of(true).pipe(delay(1000));
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).pipe(delay(1000));
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).pipe(delay(1000));
    }

    userRegister(){
        const dialogData = new RegisterComponentDialogModel();
        const dialogRef = this.dialog.open(UserRegisterComponent, {
          data: dialogData
        });
    
        dialogRef.afterClosed().subscribe(dialogResult => {
          if(dialogResult){
              this.notificationService.openSnackBar('User has been succefully registered in!');
          }else{
          }
        });
      }


      resetPassword(){
        const dialogData = new ResetPassowrdComponentDialogModel();
        const dialogRef = this.dialog.open(PasswordResetRequestComponent, {
          data: dialogData
        });
    
        dialogRef.afterClosed().subscribe(dialogResult => {
          if(dialogResult){
              this.notificationService.openSnackBar('User password has been succefully reset.!');
          }else{
          }
        });
      }
}
