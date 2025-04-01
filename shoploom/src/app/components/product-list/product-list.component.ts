import { Category } from './../../types/category';
import { CommonModule } from '@angular/common';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CustomerService } from './../../services/customer.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Brand } from '../../types/brand';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent,CommonModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

customerservice = inject(CustomerService)
products : Product[] = [];
categorys : Category[] = [];
brands : Brand[] = [];
searchTerm : string = "";
categoryId : string = "";
brandId : string = "";
sortBy : string = "";
sortOrder : number = -1;
page:number = 1;
pageSize:number = 6;
route = inject(ActivatedRoute)

ngOnInit(): void {
  this.route.queryParams.subscribe((res:any)=>
{
  this.searchTerm=res.search || "";
  this.categoryId=res.categoryId || "";
  this.getproducts();
})

this.customerservice.getCategories().subscribe((res:any)=>
{
    this.categorys = res;
})

this.customerservice.getBrand().subscribe((res:any)=>
{
  this.brands = res;
})
}

getproducts()
{
  console.log("category Id",this.categoryId);
  console.log("Selected brandId:", this.brandId);
  this.customerservice.getProduct(this.searchTerm,this.categoryId,this.brandId,this.sortBy,this.sortOrder,this.page,this.pageSize).subscribe((res)=>{
    this.products = res;
    if(res.length<this.pageSize)
    {
      this.isNext = false;
    }
  })
}

orderValue(event : any)
{

  this.sortBy = "price",
  this.sortOrder = Number(event.target.value);
  console.log("sort By",this.sortBy)
  console.log("sort Order",this.sortOrder)
  this.getproducts();
}

isNext = true;
pageChange(page:number)
{
  this.page = page;
  this.isNext = true;
  this.getproducts();
}



}
