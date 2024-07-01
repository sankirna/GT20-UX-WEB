import { NgModule } from '@angular/core';
import {  ProductsRoutingModule } from './products-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductInformationComponent } from './shared/product-information/product-information.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ProductTicketCategoryListComponent } from './shared/product-ticket-category-list/product-ticket-category-list.component';
import { ProductTicketComboListComponent } from './shared/product-ticket-combo-list/product-ticket-combo-list.component';
import { ProductComboTeamComponent } from './shared/product-combo-team/product-combo-team.component';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductInformationRegularComponent } from './shared/product-information-regular/product-information-regular.component';
import { ProductInformationComboComponent } from './shared/product-information-combo/product-information-combo.component';


@NgModule({
  declarations: [
      ProductListComponent
    , ProductInformationComponent
    , ProductTicketCategoryListComponent
    , ProductTicketComboListComponent
    , ProductComboTeamComponent
    , ProductDetailComponent
    , ProductInformationRegularComponent
    , ProductInformationComboComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    SharedModule,
    ProductsRoutingModule,
    MatRadioModule,
    MatSliderModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
