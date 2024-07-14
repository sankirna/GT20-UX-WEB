import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductModel } from "src/app/models/product.model";

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit, AfterViewInit {
  @Input() product = new ProductModel();
  
  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {

  }

  detail(row: ProductModel){
   // window.location.href ='/products/details/'+ row.id;
    this.router.navigateByUrl('/products/details/'+ row.id);
  }

}
