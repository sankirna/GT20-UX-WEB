import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-information-short',
  templateUrl: './product-information-short.component.html',
  styleUrl: './product-information-short.component.css'
})
export class ProductInformationShortComponent {
  @Input() product = new ProductModel();
}
