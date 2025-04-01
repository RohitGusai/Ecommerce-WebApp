import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    formbuilder = inject(FormBuilder);
    authservice = inject(AuthService)
    routes = inject(Router)
    loginForm = this.formbuilder.group({
      email : ["",[Validators.required]],
      password : ["",[Validators.required]]

    })

    login()
    {
      let logindata = this.loginForm.value;
      this.authservice.login(logindata.email!,logindata.password!).subscribe((res : any)=>
      {
        console.log("Testing purpose checking data",res);
        localStorage.setItem("token",res.token)
        localStorage.setItem("user",JSON.stringify(res.user))
        this.routes.navigateByUrl("/");
      })

    }
}
