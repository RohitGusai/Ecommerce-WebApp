import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandComponent } from './components/manage/brand/brand.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-guard';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/admin-guard';
import { UserProfileComponent } from './components/manage/user-profile/user-profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderProductComponent } from './components/order-product/order-product.component';
import { OrderDetailComponent } from './components/manage/order-detail/order-detail.component';
import { ChatComponent } from './components/chat/chat.component';
import { AgentComponent } from './components/agent/agent.component';

export const routes: Routes = [
  {
    path:"",
    component : HomeComponent,
    canActivate : [authGuard]
  },
  {
    path:"admin",
    component : AdminDashboardComponent,
    canActivate : [adminGuard]
  },
  {
    path:"profiles",
    component : UserProfileComponent

  },
  {
    path : "chat",
    component : ChatComponent
  },
  {
    path : "agent",
    component : AgentComponent
  },
  {
    path : "admin/categories",
    component : CategoriesComponent,
    canActivate : [adminGuard]
  },
  {
    path : "admin/categories/add",
    component : CategoryFormComponent,
    canActivate : [adminGuard]
  },
  {
    path : "admin/categories/add/:id",
    component : CategoryFormComponent,
    canActivate : [adminGuard]
  },
  {
    path : "admin/brands",
    component : BrandComponent,
    canActivate : [adminGuard]
  },
  {
    path : "admin/brands/add",
    component : BrandFormComponent,
    canActivate : [adminGuard]
  },
  {
    path : "admin/brands/add/:id",
    component : BrandFormComponent,
    canActivate : [adminGuard]
  },
  {
    path : "admin/product",
    component : ProductsComponent,
    canActivate : [adminGuard]
  },
  {
    path: "admin/product/add",
    component : ProductFormComponent,
    canActivate : [adminGuard]
  },
  {
    path : "admin/product/add/:id",
    component : ProductFormComponent,
    canActivate : [adminGuard]
  },
  {
    path : "product",
    component : ProductListComponent
  },
  {
    path : "product/:id",
    component : ProductListComponent
  },
  {
    path : "products/:id",
    component : ProductDetailComponent
  },
  {
    path : "wishlist",
    component : WishlistComponent
  },
  {
    path : "order-product",
    component : OrderProductComponent
  },
  {
    path : "order-detail",
    component : OrderDetailComponent,
    canActivate : [adminGuard]
  },
  {
    path : "carts",
    component : ShoppingCartComponent
  },
  {
    path : "register",
    component : RegisterComponent
  },
  {
    path : "login",
    component : LoginComponent
  }
];
