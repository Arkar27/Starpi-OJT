import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http:HttpClient,
  ) { }
  searchPost(body:any):Observable<any>{
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${sessionStorage.getItem('token')}`
      } 
    };
    return this.http.get(`${environment.apiEndpoint}/searchpost?filters\[${body.title}]`, requestOptions )
  }
}
