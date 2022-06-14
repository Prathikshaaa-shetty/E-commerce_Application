import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {


  constructor(private route: Router){}
    canActivate(){
      if (localStorage.getItem('access') == 'true') {
        return true;
      } else {
        alert('Login required');
        this.route.navigateByUrl('login');
        return false;
      }
    }
  }

  
  

