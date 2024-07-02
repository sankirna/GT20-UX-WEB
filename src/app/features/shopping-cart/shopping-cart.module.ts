import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartCouponComponent } from './coupon/coupon.component';

@NgModule({
    declarations: [ShoppingCartComponent, ShoppingCartCouponComponent],
    imports: [
        CommonModule,
        ShoppingCartRoutingModule,
        SharedModule
    ]
})
export class ShoppingCartModule { }
