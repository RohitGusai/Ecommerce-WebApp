import { AuthService } from './services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
   wishlistservices=inject(WishlistService)
    cartservice=inject(CartService)
    authservice = inject(AuthService)
  ngOnInit(): void {
    if(this.authservice.isLogedin)
    {
      this.wishlistservices.init()
      this.cartservice.init()
    }

  }
  title = 'shoploom';


}
