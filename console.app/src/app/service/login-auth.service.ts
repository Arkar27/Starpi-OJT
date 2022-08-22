import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import {User } from '../models/models';
import { Token } from '@angular/compiler';
import { ParamDataService } from './param-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  private apiPath = '/auth/local';
  private getMeApi = '/users/me'
  private loginToken = "";
  private apiEndpoint = environment.apiEndpoint;

  private loginUser!: User;

  private currentUserInfo = new BehaviorSubject({});
  public currentUserInfoObservable = this.currentUserInfo.asObservable();
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    protected router: Router,
    private paramData: ParamDataService
  ) {
    
  }

  login(email: string, password: string): Promise<any> {
    const loginUrl = this.apiEndpoint + this.apiPath;
    const body = {
      identifier: email,
      password: password
    };
    return new Promise((resolve, reject) => {
      this.http.post(loginUrl, body).subscribe((data: any) => {
        resolve(data);
        console.log('in service',data.jwt)
        this.loginToken = data.jwt;
        localStorage.setItem('token', this.loginToken)

      },
        error => {
          reject(error);
        });
    });
  }
  getMe(): Promise<any> {
    const loginUrl = this.apiEndpoint + this.getMeApi;
    
    return new Promise((resolve, reject) => {
      const requestOptions = {                                                                                                                                                                                 
        headers:{
          Authorization : `Bearer ${this.loginToken}`
        } 
      };

      this.http.get(loginUrl, requestOptions ).subscribe((data: any) => {
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }

  getUserInfo(data: any): void {
    this.currentUserInfo.next(data);
  }

  public logout(): any {
    this.router.navigate(['/']);
  }

  get user(): User {
    return this.loginUser;
  }

  set user(user: User) {
    this.loginUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  
  get checkLogin() {
    return this.loggedIn.asObservable();
  }
  isLoggedIn() {
    if ( sessionStorage.getItem('userRole') != null) {
      this.loggedIn.next(true);
      return true;
    } else {
      return false;
    }
  }
  

}