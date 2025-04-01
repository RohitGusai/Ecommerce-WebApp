import { CartItem } from './../types/cartitem';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  http = inject(HttpClient)
  constructor() {
    this.init()
  }
  cartList = signal<CartItem[]>([])

  init()
  {
    this.getCarts();
  }
  getCarts()
  {
    return this.http.get<CartItem[]>(`${environment.apiUrl}customer/cart`).subscribe((res)=>{
      this.cartList.set(res);
    });
  }

  addToCart(productId:string,quantity:number)
  {
    this.http.post(`${environment.apiUrl}customer/cart/${productId}`,{quantity:quantity}).subscribe((res:any)=>{
      this.cartList.set(res);
      this.getCarts();
    });
  }


  removeCart(productId : string)
  {
    this.http.delete(`${environment.apiUrl}customer/cart/${productId}`).subscribe((res:any)=>
    {
      this.cartList.set(res);
      this.getCarts();
    });
  }
}
