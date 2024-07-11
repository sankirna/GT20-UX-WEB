import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { DollarPipe } from './pipes/currency.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { LayoutComponent } from './layout/layout.component';
import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import { ConfirmComponentDialogComponent } from './confirm-component-dialog/confirm-component-dialog.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { QrCodeGeneratorComponent } from './qr-code-generator/qr-code-generator.component';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ImageComponent } from './image/image.component';
import { ShoppingCartCouponComponent } from './shopping-cart-coupon/shopping-cart-coupon.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { DatePipe } from '@angular/common';
import { ProductInformationShortComponent } from './product-information-short/product-information-short.component';

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
    parse: {
      dateInput: "l, LTS"
    },
    display: {
      dateInput: "l, LTS",
      monthYearLabel: "MMM YYYY",
      dateA11yLabel: "LL",
      monthYearA11yLabel: "MMMM YYYY"
    }
  };
  
@NgModule({
    imports: [
        RouterModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgbModule,
        NgbToastModule 
        // NgxMatDatetimePickerModule,
        // NgxMatTimepickerModule,
        // NgxMatNativeDateModule,
    ],
    declarations: [
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LimitToPipe,
        LocalDatePipe,
        YesNoPipe,
        DollarPipe,
        CustomDatePipe,
        LayoutComponent,
        CustomPaginatorComponent,
        ConfirmComponentDialogComponent,
        YearPickerComponent,
        FileUploadComponent,
        FilePreviewComponent,
        QrCodeGeneratorComponent,
        QrCodeScannerComponent,
        HeaderComponent,
        FooterComponent,
        ImageComponent,
        ShoppingCartCouponComponent,
        ToastContainerComponent,
        ProductInformationShortComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CustomMaterialModule,
        LimitToPipe,
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LocalDatePipe,
        YesNoPipe,
        DollarPipe,
        CustomDatePipe,
        CustomPaginatorComponent,
        ConfirmComponentDialogComponent,
        YearPickerComponent,
        FileUploadComponent,
        FilePreviewComponent,
        QrCodeScannerComponent,
        ImageComponent,
        ShoppingCartCouponComponent,
        ToastContainerComponent,
        ProductInformationShortComponent
        // NgxMatDatetimePickerModule,
        // NgxMatTimepickerModule,
        // NgxMatNativeDateModule,
    ],
  providers: [
    DatePipe
    //     { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})
export class SharedModule { }
