import { ActivatedRoute } from '@angular/router';
import { Component, computed, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule,ProductCardComponent,MatIconModule,MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  cartservice = inject(CartService)
  customerservice = inject(CustomerService)
  wishlistservice = inject(WishlistService)
  productsdetail! : Product
  route = inject(ActivatedRoute)
  imagesUrl : string = ""
  similarProduct : Product[] = []
  ngOnInit(): void {
    this.route.params.subscribe((res:any) =>
    {
      console.log("i am here ",res)
      this.getProductDetail(res.id)
    }
  );
}

  getProductDetail(id:string)
  {
    this.customerservice.getProductId(id).subscribe((res)=>
      {
          this.productsdetail = res;
          this.imagesUrl = this.productsdetail.images[0];
          console.log("Product detail",this.productsdetail)


      this.customerservice.getProduct("",this.productsdetail.categoryId,"","",-1,1,3).subscribe((res)=>
      {
        console.log(res);
        this.similarProduct = res;
      })
    })
  }

  imagechange(url:string)
  {
    this.imagesUrl = url;
  }

  get sellingPrice()
  {
    return Math.round(this.productsdetail.price - (this.productsdetail.price * this.productsdetail.discount) / 100);
  }



  addToWishlist()
      {
        if(!this.inWishlist())
        {
          console.log("i am here only")
          this.wishlistservice.addToWishlist(this.productsdetail._id!)
        }
        else
        {
          this.wishlistservice.removeWishlist(this.productsdetail._id!)
        }
      }



      inWishlist = computed(() => {
      return this.wishlistservice.wishlists().some((x) => x._id === this.productsdetail._id);
    });


    addToCart()
  {
    if(!this.isInCart())
    {
      this.cartservice.addToCart(this.productsdetail._id!,1)
    }
    else
    {
      this.cartservice.removeCart(this.productsdetail._id!);
    }

  }

  isInCart = computed(()=>{
    console.log("Product ID:", this.productsdetail._id, "Type:", typeof this.productsdetail._id);
    console.log("Cart List:", this.cartservice.cartList());

    return this.cartservice.cartList().some((x:any)=>

        x.product._id === this.productsdetail._id
      )
  })

}
