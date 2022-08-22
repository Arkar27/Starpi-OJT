import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamDataService {
  
  partnerData: any;
  userInfo:any
  token: any;
  userData: any;
  postData: any;
  
  constructor() {
  }
  
  setPostData(value:any){
    this.postData = value;
  }
  getPostData(){
    return this.postData;
  }
  setUserData(value:any){
    this.userData = value;
  }
  setUserInfo(val:any) {
    this.userInfo = val;
  }
  clearToken(){
    this.token = '';
  }
  clearUserInfo(){
    this.userInfo = null;
  }
  
}
