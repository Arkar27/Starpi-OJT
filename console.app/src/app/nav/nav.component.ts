import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoginPage$!: Observable<boolean>;
  public role = sessionStorage.getItem('userRole')
  data = [];
  user: any = [];
  isLoadingResults = true;
  nrSelect: string = '';
  nrDate: string = '';
  userId = sessionStorage.getItem('userId')!;
  userRole = sessionStorage.getItem('userRole')!;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.isLoginPage$ = this.authService.checkLogin;
    if (this.userRole == '1') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

  }
  onLogout() {
    this.authService.logout();
  }
  editProfile() {
    if (!localStorage.getItem('fool2')) {
      localStorage.setItem('fool2', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('fool2')
    }
    sessionStorage.setItem('editId', this.userId);
    sessionStorage.setItem('isNavBtn', 'yes');
    sessionStorage.removeItem('photo');
    this.router.navigateByUrl('edit_user')
  }

}
