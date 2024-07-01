import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as _ from 'lodash';
import { CheckoutRequestModel } from "src/app/models/checkout.model";
import { OrderModel } from "src/app/models/order.model";


@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    constructor(
           private http: HttpClient
        , @Inject('LOCALSTORAGE') private localStorage: Storage
    ) {

    }

    post(model: CheckoutRequestModel){
        const api = 'Checkout/post';
        return this.http.post<OrderModel>(api, model);
    }

}