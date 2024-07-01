import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as _ from 'lodash';
import { ShoppingCartItemModel, ShoppingCartModel } from "src/app/models/shopping-cart.model";


@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(
           private http: HttpClient
        , @Inject('LOCALSTORAGE') private localStorage: Storage
    ) {

    }

    getShoppingCartModel(): ShoppingCartModel | undefined {
        let shoppingCart = this.localStorage.getItem('shoppingCart');
        return shoppingCart ? <ShoppingCartModel>JSON.parse(shoppingCart) : undefined;
    }

    setShoppingCartModel(model: ShoppingCartModel) {
        this.localStorage.setItem('shoppingCart',  JSON.stringify(model));
    }

    addTicketProductCateory(productId: number
        , productTicketCategoryMapId: number
        , quantity: number) {
        let shoppingCart = this.getShoppingCartModel();
        if (!shoppingCart) {
            shoppingCart = new ShoppingCartModel();
        }

        shoppingCart.items  = shoppingCart.items ?? [];
        if (shoppingCart.items) {
            var productTicketCategory=   _.find(shoppingCart.items, ['id', productTicketCategoryMapId]);
            if(productTicketCategory)
            {
                productTicketCategory.productId=productId
                productTicketCategory.productTicketCategoryMapId=productTicketCategoryMapId;
                productTicketCategory.quantity=quantity;
            }
            else{
                productTicketCategory= new ShoppingCartItemModel();
                productTicketCategory.productId=productId
                productTicketCategory.productTicketCategoryMapId=productTicketCategoryMapId;
                productTicketCategory.quantity=quantity;
                shoppingCart.items.push(productTicketCategory);
            }
        }
        this.post(shoppingCart).subscribe(
            (response) => {
                this.setShoppingCartModel(response);
            },
            (error) => {
              console.error(error);
            }
          );
    }

    post(model: ShoppingCartModel){
        const api = 'ShoppingCart/post';
        return this.http.post<ShoppingCartModel>(api, model);
    }

}