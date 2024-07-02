import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import * as _ from 'lodash';
import { ShoppingCartItemModel, ShoppingCartModel } from "src/app/models/shopping-cart.model";
import { NotificationService } from "./notification.service";
import { AuthenticationService } from "./auth.service";
import { ConfirmDialogComponent, ConfirmDialogModel } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { LoginComponentDialogModel } from "src/app/features/auth/login/login.component";


@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(
        private http: HttpClient
        , @Inject('LOCALSTORAGE') private localStorage: Storage
        , private notificationService: NotificationService
        , private authenticationService: AuthenticationService
        , private dialog: MatDialog
    ) {

    }

    getShoppingCartModel(): ShoppingCartModel | undefined {
        let shoppingCart = this.localStorage.getItem('shoppingCart');
        return shoppingCart ? <ShoppingCartModel>JSON.parse(shoppingCart) : undefined;
    }

    setShoppingCartModel(model: ShoppingCartModel) {
        this.localStorage.setItem('shoppingCart', JSON.stringify(model));
    }

    clearShoppingCartModel() {
        this.localStorage.removeItem('shoppingCart');
    }

    getNumberOfItems() {
        let totalItems: number = 0;
        let shoppingCartModel = this.getShoppingCartModel();
        if (shoppingCartModel && shoppingCartModel.items) {
            totalItems = _.sumBy(shoppingCartModel.items, function (o) { return o.quantity ?? 0; });
        }
        return totalItems;
    }

    addTicketProductCateory(productId: number
        , productTicketCategoryMapId: number
        , quantity: number) {

        if (quantity <= 0) {
            this.notificationService.openSnackBar('Please add quantity.');
            return;
        }

        var userDetail = this.authenticationService.getCurrentUser();
        if (!userDetail) {
            // this.notificationService.openSnackBar('Please login before add ticket in cart.');
            const message = `Please login before add ticket in cart`;
            const dialogData = new ConfirmDialogModel("Login", message, "Login");
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                maxWidth: "400px",
                data: dialogData
            });
            dialogRef.afterClosed().subscribe(dialogResult => {
                if (dialogResult) {
                    this.authenticationService.loginPopup();
                }
            });

            return;
        }
        let shoppingCart = this.getShoppingCartModel();
        if (!shoppingCart) {
            shoppingCart = new ShoppingCartModel();
        }

        shoppingCart.items = shoppingCart.items ?? [];
        if (shoppingCart.items) {
            var productTicketCategory = _.find(shoppingCart.items, ['id', productTicketCategoryMapId]);
            if (productTicketCategory) {
                productTicketCategory.productId = productId
                productTicketCategory.productTicketCategoryMapId = productTicketCategoryMapId;
                productTicketCategory.quantity = quantity;
            }
            else {
                productTicketCategory = new ShoppingCartItemModel();
                productTicketCategory.productId = productId
                productTicketCategory.productTicketCategoryMapId = productTicketCategoryMapId;
                productTicketCategory.quantity = quantity;
                shoppingCart.items.push(productTicketCategory);
            }
        }
        this.post(shoppingCart).subscribe(
            (response) => {
                this.setShoppingCartModel(response);
                this.notificationService.openSnackBar('Ticket added successfully in cart.!');
            },
            (error) => {
                console.error(error);
            }
        );
    }

    post(model: ShoppingCartModel) {
        const api = 'ShoppingCart/post';
        return this.http.post<ShoppingCartModel>(api, model);
    }


    get() {
        const api = 'ShoppingCart/Get';
        return this.http.post<ShoppingCartModel>(api, null);
    }

}