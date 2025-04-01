import { WishlistService } from './../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../types/product';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

 wishlistservice =  inject(WishlistService)

 get wishlistItems() {
  return this.wishlistservice.wishlists();
}

// ngOnInit(): void {
//   this.wishlistservice.init();
// }

}
