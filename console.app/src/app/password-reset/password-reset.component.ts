import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/models';
import { UserListService } from '../service/user-list.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  reactiveForm !: FormGroup;
  hide = true;
  public users: User[] = [];
  public isEdit = false;
  conPw: string = '';
  pw: string = '';
  cpw: string = '';

  constructor(private routes: Router, private userService: UserListService,) {

    this.reactiveForm = new FormGroup({

      password: new FormControl([
        Validators.required,
        Validators.minLength,
        Validators.maxLength,
        Validators.pattern,
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ]),
    },
    );
  }
  get password() {
    return this.reactiveForm.get('password')
  }
  get confirmPassword() {
    return this.reactiveForm.get('confirmPassword')
  }
  passwordupdate() {
    let id = sessionStorage.getItem('editId')!;
    const value = {
      password: this.reactiveForm.value.password,

    };

    this.userService.passwordrest(value, id).subscribe((data) => {

      this.users.unshift(data);
      this.routes.navigateByUrl('edit_user')

    }, error => {
      console.log('ERROR :: ', error);
    });



  }



  ngOnInit(): void {
  }

}
