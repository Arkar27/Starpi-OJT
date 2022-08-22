import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ParamDataService } from './param-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private paramData: ParamDataService,
    ) { 

  }
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userRole: any = '';
  isLoggedIn() {
    console.log('----- Check LoggedIn -------');
    if ( sessionStorage.getItem('userRole') != null) {
      this.loggedIn.next(true);
      return true;
    } else {
      return false;
    }
  }
  get checkLogin() {
    return this.loggedIn.asObservable();
  }
  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigateByUrl('');
    // this.paramData.clearToken();
    this.loggedIn.next(false);
    
  }
  isAdmin(){
    this.userRole = sessionStorage.getItem('userRole');
    if (this.userRole == '1'){
      return true;
    }
    return false;
  }
    
    
  }


