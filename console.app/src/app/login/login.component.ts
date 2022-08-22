import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthService } from '../service/login-auth.service';
import { AuthService } from '../service/auth.service';
import { ParamDataService } from '../service/param-data.service';

interface EachUser {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'loginForm'
  reactiveForm !: FormGroup;
  user!: EachUser;
  hide = true;
  userid = '1';
  personName: string = '';
  personPassword: string = '';
  constructor(
    private loginService: LoginAuthService,
    private router: Router,
    private authSvc: AuthService,
    private paramData: ParamDataService,

  ) {
    this.user = {} as EachUser;
    sessionStorage.clear();
    this.authSvc.logout();

  }

  ngOnInit(): void {
    sessionStorage.setItem('isLoginPage', '1')
    this.reactiveForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
      ]),
    })
  }
  get email() {
    return this.reactiveForm.get('email')!;
  }
  get password() {
    return this.reactiveForm.get('password')!;
  }
  login(): void {
    this.loginService.login(this.reactiveForm.value.email, this.reactiveForm.value.password).then(res => {
      this.getRole();

    }).catch(error => {
      alert('User does not exit.')
      console.log('error ', error);
    });
  }
  getRole(): void {
    this.loginService.getMe().then(res => {
      sessionStorage.setItem('userId', res.id)
      let userType = res.role.type
      if (userType == 'admin') {
        
        sessionStorage.setItem('userRole', '1')
      }
      else {
       
        sessionStorage.setItem('userRole', '0')
      }
      this.router.navigateByUrl('dashboard')
    }).catch(error => {
      alert('User does not exit.')
      console.log('error ', error);
    });
  }
}