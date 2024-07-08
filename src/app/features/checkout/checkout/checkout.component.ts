import { Component } from '@angular/core';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  items = [1, 2];

  constructor(
    public shoppingCartService: ShoppingCartService
    , public checkoutService: CheckoutService
    , private fb: FormBuilder
    , private router: Router
    , private authenticationService: AuthenticationService

  ) {

  }

  get user() {
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

  get selectedPaymentId() {
    return this.form.get("paymentTypeId")?.value;
  }

  get processPaymentRequestForm() : FormControl {
    return this.form.get("processPaymentRequest") as FormControl;
  }

  get posTransactionIdControl() {
    return this.processPaymentRequestForm && this.processPaymentRequestForm.get("posTransactionId") as FormControl;
  }

  buildForm() {
    this.checkoutRequestModel = new CheckoutRequestModel();
    this.form = this.fb.group({
      name: [this.checkoutRequestModel.name ? this.checkoutRequestModel.name : this.user.user.userName, Validators.required],
      email: [this.checkoutRequestModel.email ? this.checkoutRequestModel.email : this.user.user.email, Validators.required],
      phoneNumber: [this.checkoutRequestModel.phoneNumber ? this.checkoutRequestModel.phoneNumber : this.user.user.phoneNumber],
      paymentTypeId: [1],

    });
    this.form.addControl("processPaymentRequest", this.fb.group({
      posTransactionId: [this.checkoutRequestModel.posTransactionId],
    }));
  }

  updateCouponCallback($event: boolean) {
    if ($event) {
      this.getShoppingCart();
    }
  }

  setPaymentMethod(paymentTypeId: number) {
    this.form.controls["paymentTypeId"].setValue(paymentTypeId);
    if (this.processPaymentRequestForm ) {
      if (paymentTypeId == 2) {
          this.processPaymentRequestForm.get("posTransactionId")?.addValidators(Validators.required);
      }
      else {
        this.processPaymentRequestForm.get("posTransactionId")?.clearValidators();
      }
    }
  }

  isValid(): boolean {
    return this.form.valid;
  }

  onSubmit() {
    debugger
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
