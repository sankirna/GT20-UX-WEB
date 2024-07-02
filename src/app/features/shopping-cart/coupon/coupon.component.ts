import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class ShoppingCartCouponComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(public shoppingCartService: ShoppingCartService
    , private fb: FormBuilder
    , private notificationService: NotificationService
  ) {

  }

  get shoppingCart() {
    return this.shoppingCartService.getShoppingCartModel();
  }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    let shoppingCartModel = this.shoppingCart;
    this.form = this.fb.group({
      couponCode: ["", Validators.required],
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  updateCouponCode(couponCode:string,  isAdd: boolean){
   let updateCall= this.shoppingCartService.applyCouponCode(couponCode);
   if(updateCall){
    updateCall.subscribe(
      (response) => {
        this.notificationService.openSnackBar( isAdd?'Applied!':'Removed');
      },
      (error) => {
        console.error(error);
      }
    );
   }
  }

  applyCouponCode() {
    if (this.isValid()) {
      let formValue= this.form.getRawValue();
      this.updateCouponCode(formValue.couponCode,true);
    }
  }

  removeCouponCode(){
    this.updateCouponCode("",true);
  }
}
