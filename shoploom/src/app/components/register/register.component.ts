import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formbuilder = inject(FormBuilder)
  autservice = inject(AuthService)
  route = inject(Router)
  registerForm = this.formbuilder.group({
    name : ["",[Validators.required,Validators.minLength(4)]],
    email : ["",[Validators.required]],
    password : ["",[Validators.required,Validators.minLength(5)]]

  })
  register()
  {
    let registerdata = this.registerForm.value;
    console.log(registerdata)
    this.autservice.register(registerdata.name!,registerdata.email!,registerdata.password!).subscribe((res)=>
    {
      alert("Register Successfully");
      this.route.navigateByUrl("/login");
    })
    // this.registerForm.reset();


  }
}
