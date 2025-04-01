import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Brand } from '../types/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }
  http = inject(HttpClient)

    getBrands()
    {
      return this.http.get<Brand[]>(environment.apiUrl+"Brands")
    }
    addBrands(name:string)
    {
      return this.http.post(environment.apiUrl+"Brands",{
        name : name,
      })
    }
    getBrandsId(id: string) {
      return this.http.get<Brand>(`${environment.apiUrl}Brands/${id}`);
    }

    updateBrands(id: string, name: string) {
      return this.http.put(`${environment.apiUrl}Brands/${id}`, { name: name });
    }

    deleteBrands(id:string)
    {
      return this.http.delete(`${environment.apiUrl}Brands/${id}`);
    }
}


