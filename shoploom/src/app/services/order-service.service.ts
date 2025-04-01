import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../types/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  http = inject(HttpClient)
  constructor() { }

  addOrder(order : Order)
  {
    return this.http.post(`${environment.apiUrl}customer/order`,order);
  }

  getOrder()
  {
    return this.http.get<Order[]>(`${environment.apiUrl}customer/order`);
  }

  getAdminOrder()
  {
    return this.http.get<Order[]>(`${environment.apiUrl}orderad`);
  }
  updateOrder(id:string,status:string)
  {
    return this.http.post(`${environment.apiUrl}orderad/`+id,{status})
  }
}
