import { Component } from '@angular/core';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutRequestModel } from 'src/app/models/checkout.model';
import { Router } from '@angular/router';

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

  ) {
    
  }

  ngOnInit() {
    this.buildForm();
    this.shoppingCartService.get().subscribe(
      (response) => {
        this.shoppingCart=this.shoppingCartService.getShoppingCartModel();
        
      },
      (error) => {
        console.error(error);
      }
    );
    
    
  }

  buildForm() {
    this.checkoutRequestModel= new CheckoutRequestModel();
    this.form = this.fb.group({
      name: [this.checkoutRequestModel.name, Validators.required],
      email: [this.checkoutRequestModel.email, Validators.required],
      phoneNumber: [this.checkoutRequestModel.phoneNumber],
    });
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
