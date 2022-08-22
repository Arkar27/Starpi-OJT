import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  token = localStorage.getItem('token');
  isNavBtn = sessionStorage.getItem('isNavBtn');
  query = qs.stringify({
    populate:'*',
    sort: {
      id: 'desc'
    },
    filters:{
      status:true
    },
    encodeValuesOnly: true,
  },{addQueryPrefix: true, skipNulls: true} );
  constructor(
    private http: HttpClient,
  ) {
   }
  getUserList(): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    const uri = environment.apiEndpoint + '/users'+this.query; 
    return this.http.get(`${uri}`, requestOptions);
  }
  
  deleteUser(id: any): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.delete(`${environment.apiEndpoint}/users/${id}`,requestOptions);
  }

  searchUser(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}search`, body);
  }
  addUser(body: any): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.post(`${environment.apiEndpoint}/users`,body, requestOptions);
  }

  uploadProfile(file:any): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    const fileData = new FormData;
    fileData.append('files', file);
    return this.http.post(`${environment.apiEndpoint}/upload`,fileData, requestOptions);
  }
  getImageInfo(id:string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
   
    return this.http.get(`${environment.apiEndpoint}/upload/files/${id}`, requestOptions);
  }

  editUser(body: any, id:string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.put(`${environment.apiEndpoint}/users/${id}`, body, requestOptions);
  }
  getPostList(): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };

    return this.http.get(`${environment.apiEndpoint}/post-tables?${this.query}`, requestOptions );
  }
  
  deletePost(id:string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.delete(`${environment.apiEndpoint}/post-tables/${id}`, requestOptions);
  }
  addPost(body: any): Observable<any>{
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.post(`${environment.apiEndpoint}/post-tables`, body, requestOptions)
  }
  editPost(id:string, body: any): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.put(`${environment.apiEndpoint}/post-tables/${id}`, body, requestOptions);
  }
  
  getUserDetail(id:string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    if(this.isNavBtn){
      
      return this.http.get(`${environment.apiEndpoint}/users/me?populate=*`,requestOptions);
      
    }
    else{
      return this.http.get(`${environment.apiEndpoint}/users/${id}?populate=*`,requestOptions);
    }
    
  }
  forUserRole(): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.get(`${environment.apiEndpoint}/users`,requestOptions);
  }
  getPostDetail(id:string): Observable<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.get(`${environment.apiEndpoint}/post-tables/${id}`,requestOptions);
  }
  
  checkEmail(): Promise<any> {
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiEndpoint}/users`, requestOptions).subscribe((data: any) => {
        
        resolve(data);
        
      },
        error => {
          reject(error);
        });
    });
  }
  checkEmailUpdate(mail: string): Promise<any> {
    const body = {
      email: mail,
      isUpdate: true,
      updateId: sessionStorage.getItem('editId')
    };
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiEndpoint}checkEmail`, body).subscribe((data: any) => {
      
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }
  checkPostUpdate(title: string): Promise<any> {
    const body = {
      post: title,
      isUpdate: true,
      updateId: sessionStorage.getItem('editPostId')
    };
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiEndpoint}checkPost`, body).subscribe((data: any) => {
       
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }
  checkPost(data: string): Promise<any> {

    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiEndpoint}/post-tables`, requestOptions).subscribe((data: any) => {
        resolve(data);
        
      },
        error => {
          reject(error);
        });
    });
  }
  passwordrest(body:any, id:any):Observable<any>{
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.put(`${environment.apiEndpoint}/users/${id}`,body, requestOptions);
  }
  getPostCsv(): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}csvPosts`);
  }
}
