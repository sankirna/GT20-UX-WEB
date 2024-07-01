import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ShoppingCartModel } from 'src/app/models/shopping-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  shoppingCart: ShoppingCartModel | undefined;
  /**
   *
   */
  constructor(public shoppingCartService: ShoppingCartService
    , private router: Router
  ) {
  }
 
  ngOnInit() {
    this.shoppingCart=this.shoppingCartService.getShoppingCartModel();
  }
  
  checkoutClick(){
    this.router.navigateByUrl('/checkout');
  }
}
