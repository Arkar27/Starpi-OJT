import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsvServiceService {

  token = localStorage.getItem('token');
  constructor(
    private http: HttpClient,
  ) { }
  upload(file : any):Observable<any> {
  
    // Create form data
    // const formData = new FormData();
    // formData.append("file", file, file.name);
    // console.log(formData)
    
    const requestOptions = {                                                                                                                                                                                 
      headers:{
        Authorization : `Bearer ${this.token}`
      } 
    };
    return this.http.post(`${environment.apiEndpoint}/post-tables/csv`, file, requestOptions)
}
}
