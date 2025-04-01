import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';
import { Category } from '../types/category';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  constructor() { }

  getNewProduct()
  {
  return this.http.get<Product[]>(`${environment.apiUrl}customer/home/new-product`)
  }
  getFeaturedProduct()
  {
    return this.http.get<Product[]>(`${environment.apiUrl}customer/home/featured-product`)
  }
  getCategories()
    {
      return this.http.get<Category[]>(`${environment.apiUrl}customer/category`)
    }
    getProduct(searchTerm:string,categoryId:string,brandId:string,sortBy:string,sortOrder:number,page:number,pageSize:number)
    {
      return this.http.get<Product[]>(`${environment.apiUrl}customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&brandId=${brandId}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`)
    }

  getBrand()
  {
    return this.http.get<Brand[]>(`${environment.apiUrl}customer/brand`)
  }

  getProductId(id:string)
  {
    return this.http.get<Product>(`${environment.apiUrl}customer/product/`+id);
  }



}
