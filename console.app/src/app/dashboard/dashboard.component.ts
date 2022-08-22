import { Component, OnInit } from '@angular/core';
import { ParamDataService } from '../service/param-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public role = sessionStorage.getItem('userRole');
  

  constructor(
    private paramData : ParamDataService
  ) {
    sessionStorage.removeItem('photo');
    sessionStorage.setItem('isLoginPage', '0');
    
  }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
  }
}
