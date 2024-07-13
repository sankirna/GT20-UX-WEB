import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { LoginComponent, LoginComponentDialogModel } from 'src/app/features/auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authenticationService: AuthenticationService
    , private dialog: MatDialog,private router: Router
    , public toastService: ToastService
    , private shoppingCartService: ShoppingCartService
  ) {
    
  }

  get user(){
    return this.authenticationService.getCurrentUser();
  }

  get isLogin() {
    return this.user!=null;
  }

  get noOfCartItem(){
    return this.shoppingCartService.getNumberOfItems();
  }

  loginPopup(){
    this.authenticationService.loginPopup();
  }

  logout(){
    this.shoppingCartService.clearShoppingCartModel();
    this.authenticationService.logout();
    this.toastService.success('User has been logged out!');
    this.router.navigateByUrl('/products/list');
  }
  viewOrders(){
    this.router.navigateByUrl('/orders/list');
  }
}
