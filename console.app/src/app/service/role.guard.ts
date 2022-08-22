import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = sessionStorage.getItem('userRole');
    if (role == '1') {
      return true
    }
    if(sessionStorage.getItem('isLoginPage')=='0'){
      alert("you don't have admin right!")
    }
    this.router.navigateByUrl('/');
    return false;
  }
  
}
