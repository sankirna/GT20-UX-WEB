import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaggerModel } from 'src/app/models/base-paged-list.model';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { BaseSearchModel } from 'src/app/models/base-search.model';
import { OrderDetailModel, OrderListRequestModel } from 'src/app/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { CommonService } from 'src/app/core/services/common.service';
import { EnumModel } from 'src/app/models/common.model';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  searchModel: OrderListRequestModel = new OrderListRequestModel();
  paggerModel: PaggerModel = new PaggerModel();
  list: OrderDetailModel[] = [];
  orderStatuses: EnumModel[] |undefined =[];

  constructor(private orderService: OrderService
    , private commonService: CommonService
     , private router: Router
     , private route: ActivatedRoute
     , private dialog: MatDialog
     ,private authService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.getPrimaryData();
    this.search();
  }

  getPrimaryData() {
    this.orderStatuses = this.commonService.getPrimaryData()?.orderStatuses;
  }

  applyFilter() {
    this.searchModel.start=0;
    this.search();
  }

  clearFilter(){
    this.searchModel = new OrderListRequestModel();
    this.search();
  }

  search() {
    const user = this.authService.getCurrentUser();
    this.searchModel.userId=user.id;
    this.searchModel.orderStatusId=40;
    this.searchModel.length=5;
    this.orderService.getOrders(this.searchModel).subscribe(
      (response) => {
        this.list = <OrderDetailModel[]>response.data;
        this.paggerModel = <PaggerModel>response.paggerModel;
        console.log(this.paggerModel);
      },
      (error) => {
        console.error(error);
      }
    );
  }



  ChangePage($event: BaseSearchModel) {
    this.searchModel.start = $event.start;
    this.searchModel.length = $event.length;
    this.search();
  }

  detail(row: OrderDetailModel){
    this.router.navigateByUrl('/orders/detail/'+ row.id);
  }
}
