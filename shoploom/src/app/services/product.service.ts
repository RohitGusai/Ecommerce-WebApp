import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  http = inject(HttpClient);

  getAllProducts()
  {
    return this.http.get<Product[]>(`${environment.apiUrl}product`);
  }
  getProductsId(id : string)
  {
    return this.http.get<Product>(`${environment.apiUrl}product/${id}`);
  }

  deleteProducts(id :string)
  {
    return this.http.delete(`${environment.apiUrl}product/${id}`)
  }

  updateProducts(id:string, model : Product)
  {
    return this.http.put(`${environment.apiUrl}product/${id}`, model )
  }

  addProducts( model : Product)
  {
    return this.http.post(`${environment.apiUrl}product/`, model )
  }






}
