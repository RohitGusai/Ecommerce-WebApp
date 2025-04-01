import { WishlistService } from './../../services/wishlist.service';

import { CustomerService } from './../../services/customer.service';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ProductCardComponent,CarouselModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],

  }

  wishlistservices=inject(WishlistService)
  cartservice=inject(CartService)
  customerservice = inject(CustomerService);
  newproductdata : any[] = [];
  featuredproductdata : any[] = [];
  ngOnInit(): void {
    this.customerservice.getNewProduct().subscribe((res)=>
    {
        this.newproductdata = res;
        console.log(this.newproductdata);
    })
    this.customerservice.getFeaturedProduct().subscribe((res)=>
    {
      this.featuredproductdata = res;
      console.log(this.featuredproductdata);
    })
    this.wishlistservices.init()
    this.cartservice.init()

  }





}
