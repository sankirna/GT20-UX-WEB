import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    NgbAccordionModule
  ]
})
export class CheckoutModule { }
