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
  //shoppingCart: ShoppingCartModel | undefined;
  /**
   *
   */
  constructor(public shoppingCartService: ShoppingCartService
    , private router: Router
  ) {
  }

  get shoppingCart(){
    return this.shoppingCartService.getShoppingCartModel();
  }
 
  ngOnInit() {
    this.shoppingCartService.get().subscribe(
      (response) => {
        this.shoppingCartService.setShoppingCartModel(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  checkoutClick(){
    this.router.navigateByUrl('/checkout');
  }
}
