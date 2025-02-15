import { BasePagedListModel } from "./base-paged-list.model";
import { BaseSearchModel } from "./base-search.model";
import { FileUploadRequestModel } from "./file.model";
import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";

// This class is used for searching orders with specific criteria.
export class OrderSearchModel extends BaseSearchModel {
  // The ID of the order to search for.
  orderId: number | undefined;
  // The name of the user associated with the order to search for.
  userName: string | undefined = "";
  // The status of the order to search for.
  status: string | undefined = "";
}

// This class represents an order.
export class OrderModel {
  orderId: number | undefined = 0;
  userId: number | undefined;
  productIds: number[] = [];
  totalAmount: number | undefined = 0.0;
  orderDate: Date | undefined;
  status: string | undefined;
}

export class OrderDetailModel{
  id: number | undefined;
  userId: number | undefined;
  userName: string | undefined;
  couponCode: string | undefined;
  couponId: number | undefined;
  grossTotal: number | undefined;
  discount: number | undefined;
  grandTotal: number | undefined;
  email: string | undefined;
  name: string | undefined;
  phoneNumber: string | undefined;
  orderStatusId: number | undefined;
  orderStatus: string | undefined;
  paymentId: number | undefined;
  posTransactionId: string|undefined;
  createdDateTime: string | undefined;
  updatedDateTime: string | undefined;
  userDetail: UserModel| undefined;
  paymnetType: string| undefined; 
  items:OrderProductItemModel[]|undefined;

}

export class OrderProductItemModel{
  id: number | undefined;
  productId: number | undefined;
  productTicketCategoryMapId: number | undefined;
  quantity: number | undefined;
  price: number | undefined;
  total: number | undefined;
  isOutofStock: number | undefined;
  productDetail : ProductModel| undefined;
  orderProductItemDetails : OrderProductItemDetailModel[]| undefined;
}

export class OrderProductItemDetailModel{
  id: number | undefined;
  userId: number | undefined;
  orderProductItemId: number | undefined;
  productComboId: number | undefined;
  productId: number | undefined;
  productDetail : ProductModel| undefined;
  qrCode: string | undefined;
  qrCodeFileId: number | undefined;
  qrCodeFile: FileUploadRequestModel | undefined;
}


export class OrderListRequestModel extends BaseSearchModel{
  userId: number | undefined;
  orderStatusId: number | undefined;
  fromDate: string | undefined;
  toDate: string | undefined;
}

// This class represents a paginated list of orders.
export class OrderListModel extends BasePagedListModel<OrderDetailModel> {
}


