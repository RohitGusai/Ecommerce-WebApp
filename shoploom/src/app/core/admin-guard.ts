import {  CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const adminGuard : CanActivateFn = (route,state)=>
 {
     const authservice = inject(AuthService);
     const router = inject(Router);
    if(authservice.isLogedin)
    {
      if(authservice.isAdmin)
      {
        return true
      }
      else
      {
        router.navigateByUrl('/')
        return false

      }
      return true;
    }
    else{

      setTimeout(() => {
        router.navigateByUrl('/login');
      }, 5000);
      return false;
    }
 }
