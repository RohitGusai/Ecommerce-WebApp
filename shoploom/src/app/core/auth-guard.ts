import {  CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard : CanActivateFn = (route,state)=>
 {
     const authservice = inject(AuthService);
     const router = inject(Router);
    if(authservice.isLogedin)
    {
      return true;
    }
    else{

      setTimeout(() => {
        router.navigateByUrl('/login');
      }, 5000);
      return false;
    }
 }
