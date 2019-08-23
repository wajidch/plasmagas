import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../shared/main-service.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterForm: FormGroup;
  searchForm:FormGroup;
  getOrdersRes: any;
  filterRes;
  norecordfound: string;

  constructor(private service: MainServiceService) {
    this.filterForm = new FormGroup({
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
    this.searchForm=new FormGroup({
      status:new FormControl('')
    })
  }
  
  ngOnInit() {
    this.getOrdersFunc();
  }
  searchOrder(val){
    console.log("val",val);
    this.getOrdersRes =[];
    let filteredOrder={
      response:[]
    };
    this.service.getOrders().subscribe(res => {
      this.getOrdersRes = res;
      this.getOrdersRes.response.forEach(function(order,orderindex) {
        console.log("ss",order.items[orderindex].status,val.status)
        if(order.items[orderindex].status===val.status){

          console.log("order",order)
          filteredOrder.response.push(order);
          
        }
      });

      this.getOrdersRes=filteredOrder

      console.log('Get Orders Res: ', filteredOrder);
      if (this.getOrdersRes.statusCode == 200) {

      }
    });
  }
  getOrdersFunc(): void {
    this.service.getOrders().subscribe(res => {
      this.getOrdersRes = res;
      console.log('Get Orders Res: ', this.getOrdersRes);
      if (this.getOrdersRes.statusCode == 200) {

      }
    });
  }

  filterOrdersFunc(val) {
    console.log('hello filter: ', val);
    this.service.filterOrders(val.fromDate, val.toDate).subscribe(res => {
      this.filterRes = res;
      console.log('Filter Response: ', this.filterRes);
      if(this.filterRes.response.length===0){
        this.norecordfound='No Record'
      }
      if (this.filterRes.statusCode === 200) {
        this.norecordfound='';
        this.getOrdersRes = this.filterRes;
      }
    });
  }

}
