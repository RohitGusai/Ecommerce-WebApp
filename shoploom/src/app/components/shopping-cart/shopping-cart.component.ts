import {  Router } from '@angular/router';
import { OrderServiceService } from './../../services/order-service.service';

import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from './../../types/product';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';

import { Order } from '../../types/order';

@Component({
  selector: 'app-shopping-cart',
  imports: [ReactiveFormsModule,MatRadioModule,FormsModule,CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
cartservice = inject(CartService)
orderPage: number= 0
cartItems = this.cartservice.cartList();
paymentType : string = "";

get cart()
{
  return this.cartservice.cartList();
}

sellingPrice(item:Product)
    {
      return Math.round(item.price - (item.price * item.discount) / 100);
    }

  get totalAmount()
  {
    let amount = 0;
    const cartItem = this.cartservice.cartList();
    for (let item of cartItem) {
      amount += this.sellingPrice(item.product) * item.quantity;
    }
    return amount;
  }





deleteitem(itemId:string)
{
  this.cartservice.removeCart(itemId);
}

increase(productId : string, quantity : number)
{
  this.cartservice.addToCart(productId,quantity)
}


checkOut()
{
  this.orderPage = 1
}
formbuilder = inject(FormBuilder)

addressForm = this.formbuilder.group({
  item : [this.cartItems],
  address:['',[Validators.required]],
  city : ['',[Validators.required]],
  state : ['',[Validators.required]],
  zip : ['',[Validators.required]],

})

continue()
{
  console.log(this.addressForm.value);
  // this.addressForm.reset()
  this.orderPage = 2;
}

orderservice = inject(OrderServiceService)

route = inject(Router)

completeOrder()
{
  let order  = {
    PaymentType : this.paymentType,
    items : [this.cartItems],
    address : this.addressForm.value,
    date : new Date(),
    totalAmount : this.totalAmount
  };

  console.log(order);

  this.orderservice.addOrder(order as any).subscribe((res)=>
  {
    alert("Order is Successfully Completed")
    this.cartservice.init();
    this.orderPage=0
    this.route.navigateByUrl("/order-product");
  })

}




}
