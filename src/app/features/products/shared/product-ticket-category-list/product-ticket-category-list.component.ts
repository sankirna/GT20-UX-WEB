import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ProductTicketCategoryMapModel } from 'src/app/models/product-ticket-category-map.model';

@Component({
  selector: 'app-product-ticket-category-list',
  templateUrl: './product-ticket-category-list.component.html',
  styleUrls: ['./product-ticket-category-list.component.css']
})
export class ProductTicketCategoryListComponent {
  @Input() selectedProductTicketCategorId : number | undefined;
  @Input() productTicketCategories: ProductTicketCategoryMapModel[] | undefined=[];
  @Output() changeProductTicketCategory: EventEmitter<ProductTicketCategoryMapModel> = new EventEmitter();

  constructor(private fb: FormBuilder,
    private  shoppingCartService: ShoppingCartService
  ) {
  }

  ngOnInit() {    
  }

  selectedCategory(productTicketCategoryMapModel: ProductTicketCategoryMapModel) {
  }

  changeEvent(){
    let selectedId:number=this.selectedProductTicketCategorId as number;
    if(this.changeProductTicketCategory){
      var productTicketCategory=   _.find(this.productTicketCategories, ['id', selectedId]);
      this.changeProductTicketCategory.emit(productTicketCategory);
    }
  }
  

}
