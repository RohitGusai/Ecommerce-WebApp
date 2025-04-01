import { CustomerService } from './../../services/customer.service';
import { AuthService } from './../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  // categoryservice = inject(CategoryService);
  customerservice = inject(CustomerService)

  authservice = inject(AuthService)
  category : Category[] = [];
  searchTerm! : string;
  ngOnInit(): void {
    this.customerservice.getCategories().subscribe((res)=>
    {
      this.category = res;
    })
  }
  route = inject(Router);
  submitOn(e: any) {

    if(e.target.value)
    {
      this.route.navigateByUrl('product?search='+e.target.value);
    }
}

searchCategory(id : string)
{
  this.searchTerm=""

  this.route.navigateByUrl('product/catgoryId='+id!)
}

logout()
{
  this.authservice.logoutuser();
  this.route.navigateByUrl('/login');
}

}
