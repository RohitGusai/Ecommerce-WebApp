import { MatButtonModule } from '@angular/material/button';
import { BrandService } from './../../../services/brand.service';
import { ProductService } from './../../../services/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Brand } from '../../../types/brand';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../types/product';
import  {MatCheckboxModule} from '@angular/material/checkbox'
@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule,MatCheckboxModule,FormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  brands : Brand[] = [];
  categorys : Category[] = [];
  brandservice = inject(BrandService);
  categoryservice = inject(CategoryService)
  formbuilder = inject(FormBuilder);
  productservice = inject(ProductService)
  route = inject(ActivatedRoute);
  id!:string;
  isEdit = false
  ngOnInit(): void {
    this.categoryservice.getCategories().subscribe((res)=>
    {
      this.categorys = res;
    })

      this.brandservice.getBrands().subscribe((res)=>
      {
        this.brands = res;
      })


       this.id = this.route.snapshot.params["id"];
       if(this.id)
       {
        this.isEdit = true;
        this.productservice.getProductsId(this.id).subscribe((res : any)=>
        {
          for (let index = 0; index < res.images.length; index++) {
           this.addImage();
          }
          this.productForm.patchValue(res);
        })
       }
       else{
        this.addImage();
       }
  }


  productForm =this.formbuilder.group({
  name: [null,[Validators.required,Validators.minLength(4)]],
  shortDescription:[null,[Validators.required,Validators.minLength(5)]],
  description:[null,[Validators.required,Validators.minLength(10)]],
  price:[null,[Validators.required]],
  discount:[],
  images : this.formbuilder.array([]),
  brandId: [null, [Validators.required]],
  categoryId: [null, [Validators.required]],
  isFeatures : [false],
  isNewProduct : [false]
  });

  routes = inject(Router)

update()
{
  let value = this.productForm.value;
  this.productservice.updateProducts(this.id,value as any).subscribe((res)=>{
    alert("data updated successfully");
    this.routes.navigateByUrl("/admin/product");
  })
}


  addImage()
  {
    this.images.push(this.formbuilder.control(""))
  }
  removeImage()
  {
    this.images.removeAt(this.formbuilder.control.length-1);
  }

  get images()
  {
    return this.productForm.get('images') as FormArray;
  }


  add()
  {
    let data = this.productForm.value;
    console.log("showing data",data)
    this.productservice.addProducts(data as any).subscribe((res)=>
    {
      alert("data is successfully added");
      this.routes.navigateByUrl('/admin/product');
    })


  }


}
