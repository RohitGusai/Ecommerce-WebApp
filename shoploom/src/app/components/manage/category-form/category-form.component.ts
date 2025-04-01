import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category-form',
  imports: [FormsModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {

  name!:string;
  categoryService = inject(CategoryService)
  router = inject(Router);
  route = inject(ActivatedRoute)
  id!: string
  isEdit = false;
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    if(this.id)
    {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((res:any)=>
      {
        this.name = res.name
      })
    }
  }

  add()
  {
    this.categoryService.addCategories(this.name).subscribe((res)=>
  {
    alert("Category Added Successfully")
    this.router.navigateByUrl('/admin/categories');
  })
  }

  update()
  {
    console.log(this.name);
    this.categoryService.updateCategory(this.id,this.name).subscribe((res)=>
    {
      alert("category updated successfully");
      this.router.navigateByUrl("/admin/categories");
    });
  }
}
