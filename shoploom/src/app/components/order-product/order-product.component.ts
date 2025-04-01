
import { CommonModule, DatePipe } from '@angular/common';
import { Order } from '../../types/order';
import { Product } from '../../types/product';
import { OrderServiceService } from './../../services/order-service.service';
import { Component, inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-order-product',
  imports: [DatePipe,CommonModule],
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.css'
})
export class OrderProductComponent implements OnInit {

  orders : Order[] = [];
 orderservice = inject(OrderServiceService)

 ngOnInit(): void {
  this.orderservice.getOrder().subscribe((res) => {
    this.orders = res;
    console.log("Checking order details:", this.orders);
    if (this.orders.length > 0) {
      console.log("First order items:", this.orders[0].items);
    }
  });
}


sellingPrice(item:Product)
    {
      return Math.round(item.price - (item.price * item.discount) / 100);
    }

}
