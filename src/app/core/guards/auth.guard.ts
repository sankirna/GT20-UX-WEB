import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { AuthenticationService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard  {

    constructor(private router: Router,
        private authService: AuthenticationService) { }

    canActivate() {
        const user = this.authService.getCurrentUser();

        if (user && user.expiration) {

            if (moment() < moment(user.expiration)) {
                return true;
            } else {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('shoppingCart');
                return false;
            }
        }

        //this.router.navigate(['auth/login']);
        return false;
    }
}
