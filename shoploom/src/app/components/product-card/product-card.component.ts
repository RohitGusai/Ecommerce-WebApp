import { CartService } from './../../services/cart.service';
import { WishlistService } from './../../services/wishlist.service';
import { Component, computed, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink,MatIconModule,MatButtonModule,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
    @Input() item!:Product;
   wishlistservice = inject(WishlistService)
    cartservice = inject(CartService)
    get sellingPrice()
    {
      return Math.round(this.item.price - (this.item.price * this.item.discount) / 100);
    }

    addToWishlist()
    {
      if(!this.inWishlist())
      {
        console.log("i am here only")
        this.wishlistservice.addToWishlist(this.item._id!)
      }
      else
      {
        this.wishlistservice.removeWishlist(this.item._id!)
      }
    }



    inWishlist = computed(() => {
    return this.wishlistservice.wishlists().some((x) => x._id === this.item._id);
  });



  addToCart()
  {
    if(!this.isInCart())
    {
      this.cartservice.addToCart(this.item._id!,1)
    }
    else
    {
      this.cartservice.removeCart(this.item._id!);
    }

  }

  isInCart = computed(()=>{
    console.log("Product ID:", this.item._id, "Type:", typeof this.item._id);
    console.log("Cart List:", this.cartservice.cartList());

    return this.cartservice.cartList().some((x:any)=>

        x.product._id === this.item._id
      )
  })

}
