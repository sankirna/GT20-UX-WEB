import { Component } from '@angular/core';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutRequestModel } from 'src/app/models/checkout.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  form: FormGroup = new FormGroup({});
  shoppingCart: ShoppingCartModel | undefined;
  checkoutRequestModel: CheckoutRequestModel | undefined;

  
  constructor(
    public shoppingCartService: ShoppingCartService
    ,public checkoutService: CheckoutService 
    , private fb: FormBuilder
    , private router: Router
    , private authenticationService: AuthenticationService

  ) {
    
  }

  get user(){
    return this.authenticationService.getCurrentUser();
  }


  ngOnInit() {
    this.buildForm();
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

  buildForm() {
    this.checkoutRequestModel= new CheckoutRequestModel();
    this.form = this.fb.group({
      name: [this.checkoutRequestModel.name? this.checkoutRequestModel.name: this.user.user.userName, Validators.required],
      email: [this.checkoutRequestModel.email ? this.checkoutRequestModel.email: this.user.user.email, Validators.required],
      phoneNumber: [this.checkoutRequestModel.phoneNumber ? this.checkoutRequestModel.phoneNumber: this.user.user.phoneNumber],
      paymentTypeId: [1],
    });
  }

  updateCouponCallback($event: boolean) {
    if ($event) {
      this.getShoppingCart();
    }
  }

  isValid(): boolean {
    return this.form.valid;
  }

  onSubmit() {
    if (this.isValid()) {
      this.checkoutRequestModel = <CheckoutRequestModel>this.form.getRawValue();
        this.checkoutService.post(this.checkoutRequestModel).subscribe(
          (response) => {
            this.shoppingCartService.clearShoppingCartModel();
            this.router.navigateByUrl('/thank-you');
          },
          (error) => {
            console.error(error);
          }
        );
      
    }
  }

}
