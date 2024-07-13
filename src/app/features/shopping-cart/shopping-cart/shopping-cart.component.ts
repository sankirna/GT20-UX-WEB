import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ShoppingCartItemModel, ShoppingCartModel } from 'src/app/models/shopping-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: ShoppingCartModel | undefined;
  /**
   *
   */
  constructor(public shoppingCartService: ShoppingCartService
    , public toastService: ToastService
    , private router: Router
  ) {
  }

  // get shoppingCart(){
  //   return this.shoppingCartService.getShoppingCartModel();
  // }

  ngOnInit() {
    this.getShoppingCart();
  }

  getShoppingCart() {
    this.shoppingCartService.get().subscribe(
      (response) => {
        this.shoppingCart = response;
        this.shoppingCartService.setShoppingCartModel(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  increaseQuantity(shoppingCartItemModel: ShoppingCartItemModel) {
    shoppingCartItemModel.quantity = <number>shoppingCartItemModel.quantity + 1;
    shoppingCartItemModel.total = <number>shoppingCartItemModel.price * shoppingCartItemModel.quantity;
    this.updateCartItem(shoppingCartItemModel);
  }

  decreaseQuantity(shoppingCartItemModel: ShoppingCartItemModel) {
    if (shoppingCartItemModel.quantity && shoppingCartItemModel.quantity > 1) {
      shoppingCartItemModel.quantity = <number>shoppingCartItemModel.quantity - 1;
      shoppingCartItemModel.total = <number>shoppingCartItemModel.price * shoppingCartItemModel.quantity;
      this.updateCartItem(shoppingCartItemModel);
    }
    else {
      this.toastService.warning('Quantity should no be less or zero.');
    }

  }

  updateCartItem(shoppingCartItemModel: ShoppingCartItemModel) {
    if (shoppingCartItemModel
      && shoppingCartItemModel.productId
      && shoppingCartItemModel.productTicketCategoryMapId
      && shoppingCartItemModel.quantity
    ) {

      var updatedCall = this.shoppingCartService.addUpdateProductTicketCategory(shoppingCartItemModel.productId
        , shoppingCartItemModel.productTicketCategoryMapId
        , shoppingCartItemModel.quantity);
      if (updatedCall) {
        updatedCall.subscribe(
          (response) => {
            this.getShoppingCart();
            this.toastService.success('Shopping cart item(s) updated successfully !');
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }

  deleteShoppingCartItem(shoppingCartItemModel: ShoppingCartItemModel) {
    if (shoppingCartItemModel.productTicketCategoryMapId) {
      var updatedCall = this.shoppingCartService.deleteProductTicketCategroy(shoppingCartItemModel.productTicketCategoryMapId)
      if (updatedCall) {
        updatedCall.subscribe(
          (response) => {
            this.getShoppingCart();
            this.toastService.success('Shopping cart item remove successfully !');
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }

  updateCouponCallback($event: boolean) {
    if ($event) {
      this.getShoppingCart();
    }
  }

  checkoutClick() {
    this.router.navigateByUrl('/checkout');
  }
}
