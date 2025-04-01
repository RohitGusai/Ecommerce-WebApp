import { CommonModule, DatePipe } from '@angular/common';
import { Order } from '../../../types/order';
import { OrderServiceService } from './../../../services/order-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../types/product';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-order-detail',
  imports: [DatePipe,CommonModule,MatButtonToggleModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit{

orderservice = inject(OrderServiceService)

orders : Order[] = [];

ngOnInit(): void {
  this.orderservice.getAdminOrder().subscribe((res)=>
  {
    console.log("checking for the result coming from the getadminorder",res);
    // res.forEach(order => {
    //   console.log("Order ID:", order._id, "User ID:", order.userId);
    // });
    this.orders = res;
  })
}

sellingPrice(item:Product)
    {
      return Math.round(item.price - (item.price * item.discount) / 100);
    }

    statusChange(event:any,order:Order)
    {
        console.log(event.value)
        order.status = event.value

      this.orderservice.updateOrder(order._id!,order.status!).subscribe((res)=>{
        alert("Status Successfully Updated");
      })
    }





}
