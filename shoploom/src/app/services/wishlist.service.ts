import { Product } from './../types/product';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WishlistService{

  constructor() {
    this.init();
  }


  http = inject(HttpClient)
  wishlists = signal<Product[]>([]);

  init()
  {
      this.getwishlist();
  }

  getwishlist()
  {
    return this.http.get<Product[]>(`${environment.apiUrl}customer/wishlist`).subscribe((res)=>
      {
        this.wishlists.set(res);
      });
  }
  addToWishlist(id:string)
  {
    // return this.http.post(environment.apiUrl + 'customer/wishlist/'+{id},{})
    this.http.post(`${environment.apiUrl}customer/wishlist/${id}`, {}).subscribe((res:any)=>
    {
      // alert("added Successfully");
      this.wishlists.set(res);
      this.getwishlist();
      // this.routes.navigateByUrl('/')
    });

  }



  removeWishlist(id:string)
  {
     this.http.delete(`${environment.apiUrl}customer/wishlist/${id}`).subscribe((res:any)=>
    {
      // alert("deleted Successfully");
      this.wishlists.set(res);
      this.getwishlist();
      // this.routes.navigateByUrl('/wishlist')
    })
  }
}
