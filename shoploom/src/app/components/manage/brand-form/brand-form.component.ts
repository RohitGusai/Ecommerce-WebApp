import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../services/brand.service';


@Component({
  selector: 'app-brand-form',
  imports: [FormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent implements OnInit{

  name!:string;
  id!:string;
  isEdit = false;
  brandservice = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute)
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    if(this.id)
    {
      this.isEdit = true;
      this.brandservice.getBrandsId(this.id).subscribe((res)=>
        {
          this.name = res.name;
        })
    }

  }

  addBrands()
  {
    this.brandservice.addBrands(this.name).subscribe((res)=>
    {
      alert("Brand is Added Successfully");
      this.router.navigateByUrl('/admin/brands');
    })
  }

  updateBrands()
  {
    this.brandservice.updateBrands(this.id,this.name).subscribe((res)=>
    {
      alert("Brand Update Successfully");
      this.router.navigateByUrl('/admin/brands')
    })
  }
}
