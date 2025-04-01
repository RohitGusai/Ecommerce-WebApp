import { Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  authservice = inject(AuthService)

  email : string =" "

  ngOnInit(): void {
    this.email = this.authservice.isEmail;
  }




}
