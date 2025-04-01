import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
 http = inject(HttpClient)

  register(name : string,email:string,password :string)
  {
    return this.http.post(`${environment.apiUrl}auth/register`,{
      name,
      email,
      password
    });
  }
  login(email:string,password : string)
  {
    return this.http.post(`${environment.apiUrl}auth/login`,{
      email,
      password
    })
  }
  get isLogedin()
  {
    let usertoken = localStorage.getItem("token");
    if(usertoken)
    {
      return true
    }
    else
    {
      return false
    }
  }

  get isAdmin()
  {
    let userdata = localStorage.getItem("user");
    if(userdata)
    {
      return JSON.parse(userdata).isAdmin
    }
    return false;
  }

  get username()
  {
    let userdata = localStorage.getItem("user");
    if(userdata)
    {
      return JSON.parse(userdata).name
    }
    return null;

  }

  get isEmail()
  {
    let userdata = localStorage.getItem("user");
    if(userdata)
    {
      return JSON.parse(userdata).email
    }
    return null;
  }

  logoutuser()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
