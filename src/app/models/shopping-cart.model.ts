import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";
import { ProductTicketCategoryMapModel } from "./product-ticket-category-map.model";
import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";


export class ShoppingCartModel{
  couponCode: string | undefined = "";
  couponId: number | undefined ;
  grossTotal: number | undefined ;
  discount: number | undefined ;
  grandTotal: number | undefined ;
  items: ShoppingCartItemModel[]=[];
}


export class ShoppingCartItemModel{
  id: number | undefined;
  productId: number | undefined;
  productTicketCategoryMapId: number | undefined;
  quantity: number | undefined;
  price: number | undefined;
  total: number | undefined;
  isOutofStock: number | undefined;
  productDetail : ProductModel| undefined;
  productTicketCategoryMapDetail : ProductTicketCategoryMapModel|undefined;
}







