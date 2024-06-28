import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/core/services/city.service';
import { CommonService } from 'src/app/core/services/common.service';
import { CountryService } from 'src/app/core/services/country.service';
import { FileService } from 'src/app/core/services/file.service';
import { StateService } from 'src/app/core/services/state.service';
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

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: ProductModel | undefined;
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];
  files: File[] = []
  id: number = 0;
  isLoad: boolean = false;
  fileName :any='';
  defaulturl = environment.defaultUrl;

  constructor(
    private router: Router
    , private route: ActivatedRoute
    , public productService: ProductService
    , public fileService: FileService
    , private fb: FormBuilder) {
  }

  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  get isCombo(): boolean {
    return this.productService.isCombo(this.form);
  }


  get productTicketCategoriesForm() {
    return this.form.get("productTicketCategories") as FormArray;
  }

  get productCombosForm() {
    return this.form.get("productCombos") as FormArray;
  }
 
  ngOnInit() {
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    } else {
      this.buildForm();
    }
  }

  get fileDataForm() {
    return this.form.get("file") as FormGroup;
  }

  buildForm() {
    this.isLoad = false;
    if (!this.model) {
      this.model = new ProductModel();
      this.model.id = 0;
      this.model.productTypeId = 0;
    }
    this.form = this.productService.getProductInformationForm(this.model);
    if (this.isEdit) {
      this.buildProductTicketCategoryMapModelForm(this.model.productTicketCategories);
      this.productService. getRegularProducts().subscribe(data => {
        if (data.data) {
          this.productService.regularProducts=data.data;
        }
      });
    }
    if(this.model.productCombos){
      this.buildProductsComboModelForm(this.model.productCombos);
    }
    this.isLoad = true;
  }

  buildProductTicketCategoryMapModelForm(productTicketCategoryMapModels: ProductTicketCategoryMapModel[]) {
    var self = this;
    _.forEach(productTicketCategoryMapModels, function (value, key) {
      let productTicketCategoryMapForm: FormGroup = self.productService.getProductTicketCategoryMapModelForm(value);
      self.productTicketCategoriesForm.push(productTicketCategoryMapForm);
    });
  }

  buildProductsComboModelForm(productCombos: ProductCombosModel[]) {
    var self = this;
    _.forEach(productCombos, function (value, key) {
      let productComboForm: FormGroup = self.productService.getProductsComboForm(value);
      self.productCombosForm.push(productComboForm);
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  uploadFile(event: FileUploadRequestModel) {
    this.fileDataForm.controls["fileName"].setValue(event.fileName);
    this.fileDataForm.controls["fileAsBase64"].setValue(event.fileAsBase64);
    this.fileDataForm.controls["id"].setValue(0);
  }

  removeFile(event: FileUploadRequestModel) {
    this.fileDataForm.controls["fileName"].setValue("");
    this.fileDataForm.controls["fileAsBase64"].setValue("");
    this.fileDataForm.controls["id"].setValue(0);
  }

  getData() {
    this.productService.get(this.id).subscribe(
      (response) => {
        this.model = response;
        this.model.startDateTime = this.removeTimezoneOffset(response.startDateTime);
        this.model.endDateTime = this.removeTimezoneOffset(response.endDateTime);
        this.fileName= this.model.file;
        this.buildForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }
   removeTimezoneOffset(dateTimeString:any) {
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
  onSubmit() {

    if (this.isValid()) {
      this.model = <ProductModel>this.form.getRawValue();
      if (!this.isEdit) {
        this.productService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/products/list');
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.productService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/products/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }

    }
  }

  onClear() {

  }
  gotoList() {
    this.router.navigateByUrl('/products/list');
  }
}
