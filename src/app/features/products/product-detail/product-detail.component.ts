import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';
import { ProductService } from 'src/app/core/services/product.service';
import { CityModel, CitySearchModel } from 'src/app/models/city.model';
import { EnumModel } from 'src/app/models/common.model';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';
import { FileUploadRequestModel } from 'src/app/models/file.model';
import { StateModel, StateSearchModel } from 'src/app/models/state.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductTicketCategoryMapModel } from 'src/app/models/product-ticket-category-map.model';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { ProductCombosModel } from 'src/app/models/product-combos.model';
import { TicketCategoryModel, TicketCategorySearchModel } from 'src/app/models/ticket-category.model';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  model: ProductModel | undefined;
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];
  files: File[] = []
  id: number = 0;
  isLoad: boolean = false;
  fileName: any = '';
  defaulturl = environment.defaultUrl;
  ticketcategories: any[] = [];
  ticketPrice: number = 0;
  quantity: number = 0;
  totalPrice: number = 0;
  selectedProductTicketCategory: ProductTicketCategoryMapModel | undefined;
  selectedProductTicketCategoryId: number | undefined;
  constructor(
    private router: Router
    , private route: ActivatedRoute
    , public productService: ProductService
    , public shoppingCartService: ShoppingCartService
    , public fileService: FileService
    , private fb: FormBuilder
    , private notificationService: NotificationService
    , private authenticationService: AuthenticationService) {
  }

  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }



  ngOnInit() {
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    this.getData();


  }



  buildForm() {
    this.isLoad = false;
    if (this.model?.productTicketCategories) {
      this.selectedProductTicketCategory = _.head(this.model?.productTicketCategories);
      this.selectedProductTicketCategoryId = this.selectedProductTicketCategory?.id;
    }
    this.isLoad = true;
  }


  getData() {
    this.productService.get(this.id).subscribe(
      (response) => {
        this.model = response;
        this.ticketcategories = this.model.productTicketCategories;
        this.model.startDateTime = this.removeTimezoneOffset(response.startDateTime);
        this.model.endDateTime = this.removeTimezoneOffset(response.endDateTime);
        this.fileName = this.model.file;
        this.buildForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeTimezoneOffset(dateTimeString: any) {
    // Create a new Date object from the input string
    const date = new Date(dateTimeString);

    // Get the date and time parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Format the date and time without timezone offset
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }


  onClear() {

  }
  gotoList() {
    this.router.navigateByUrl('/products/list');
  }
  increaseQuantity() {
    this.quantity++;
    this.totalPrice = this.ticketPrice * this.quantity;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalPrice = this.ticketPrice * this.quantity;
    }
  }

  selectedProductTicketCategorytegory(productTicketCategorytegory: ProductTicketCategoryMapModel) {
    this.selectedProductTicketCategory = productTicketCategorytegory;
    if (productTicketCategorytegory && productTicketCategorytegory.price) {
      this.ticketPrice = productTicketCategorytegory.price;
    }
  }

  addToCart() {
    if (this.quantity == 0) {
      this.notificationService.openSnackBar('Please add quantity.');
    }
    if (this.selectedProductTicketCategory
      && this.selectedProductTicketCategory.productId
      && this.selectedProductTicketCategory.id
      && this.quantity
    ) {

        this.shoppingCartService.addTicketProductCateory(
          this.selectedProductTicketCategory.productId
          , this.selectedProductTicketCategory.id
          , this.quantity);

    }
    //   this.productService.cartItems.push({
    //     "id": 0,
    //     "productId": this.model?.id,
    //     "productTicketCategoryMapId": this.selectedTicketCategory?.id,
    //     "quantity": this.quantity,
    //     "price": this.totalPrice
    //   });
    //   var objCart =
    //   {
    //     "id": 0,
    //     "couponCode": "324243",
    //     "couponId": 0,
    //     "grossTotal": this.totalPrice,
    //     "discount": 0,
    //     "items": this.productService.cartItems
    //   }  
    //   this.productService.addProductInCart(objCart).subscribe(
    //     (response) => { 
    //       alert('Ticket added successfully in cart.')
    //       //this.router.navigateByUrl('/products/list');
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
  }
}
