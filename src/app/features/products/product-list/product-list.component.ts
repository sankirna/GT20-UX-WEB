import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaggerModel } from 'src/app/models/base-paged-list.model';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { BaseSearchModel } from 'src/app/models/base-search.model';
import { ProductForSiteSearchModel, ProductModel, ProductSearchModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { TeamModel, TeamSearchModel } from 'src/app/models/team.model';
import { TeamService } from 'src/app/core/services/team.service';
import { CategoryModel, CategorySearchModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchModel: ProductForSiteSearchModel = new ProductForSiteSearchModel();
  paggerModel: PaggerModel = new PaggerModel();
  list: ProductModel[] = [];
  teams: TeamModel[] = [];
  categories: CategoryModel[] = [];

  constructor(private productService: ProductService
     , private teamService: TeamService
     , private categoryService: CategoryService
     , private router: Router
     , private route: ActivatedRoute
     , private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getTeams();
    this.getCategories();
    this.search();
  }

  applyFilter() {
    this.searchModel.start=0;
    this.search();
  }

  getTeams() {
    let  teamSearchModel: TeamSearchModel = new TeamSearchModel();
    this.teamService.list(teamSearchModel).subscribe(
      (response) => {
        this.teams = <TeamModel[]>response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCategories() {
    let  categorySearchModel: CategorySearchModel = new CategorySearchModel();
    this.categoryService.list(categorySearchModel).subscribe(
      (response) => {
        this.categories = <CategoryModel[]>response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  search() {
    this.productService.listForSite(this.searchModel).subscribe(
      (response) => {
        this.list = <ProductModel[]>response.data;
        this.paggerModel = <PaggerModel>response.paggerModel;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  detail(row: ProductModel){
    this.router.navigateByUrl('/products/details/'+ row.id);
  }


  ChangePage($event: BaseSearchModel) {
    this.searchModel.start = $event.start;
    this.searchModel.length = $event.length;
    this.search();
  }
  
  addNew(){
    this.router.navigateByUrl('/products/create');
  }
  getPriceRange(productTicketCategories :any){ 
    const result = _.map( // map the groups
      _.groupBy(productTicketCategories, 'price'), // group by the label
      g => _.maxBy(g, 'price') // take the one with the highest value of each group
    )
   // var pr =  _.minBy(productTicketCategories,'price'); 
    return '$'+result;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1) {
      return Math.round(value / 1);
    }

    return value;
  }
  
  pitch(event: any) {
    this.searchModel.maximumPrice=event.value;
    this.search();
  }
}
