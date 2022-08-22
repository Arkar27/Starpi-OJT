import { Component, OnInit } from '@angular/core';
import { UserListService } from '../service/user-list.service';
import { User } from '../models/models';
import { Router } from '@angular/router';
import { ParamDataService } from '../service/param-data.service';
import * as moment from 'moment';


@Component({
  selector: 'app-confirm-edit-user',
  templateUrl: './confirm-edit-user.component.html',
  styleUrls: ['./confirm-edit-user.component.css']
})
export class ConfirmEditUserComponent implements OnInit {

  public users: User[] = [];
  name = sessionStorage.getItem('userName');
  email = sessionStorage.getItem('userEmail');
  type = sessionStorage.getItem('userType');
  phone = sessionStorage.getItem('userPhone');
  dob = sessionStorage.getItem('userDob');
  address = sessionStorage.getItem('userAddress');
  update_user_id = sessionStorage.getItem('userId');
  id = sessionStorage.getItem('editId')!;
  url = sessionStorage.getItem('photo');
  public profile: any;
  profilePath = sessionStorage.getItem('profilePath');
  user: any;
  prevImagePath: string = '';
  checkProfile = sessionStorage.getItem('checkProfile');
  dobFormat = moment(this.dob).format('YYYY-MM-DD');
  constructor(
    private userService: UserListService,
    private router: Router,
    private paramDataSvc: ParamDataService,
  ) {
    this.prevImagePath = "../../assets/tmp/" + this.id + "/" + this.id + ".png";
  }
  ngOnInit(): void {
    sessionStorage.removeItem('isNavBtn')
  }
  imageUpload(profile: any) {
    this.userService.uploadProfile(profile).subscribe((data) => {
      this.users.unshift(data);
      const user = {
        username: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        dob: this.dobFormat,
        role: this.type,
        image: data[0].id,
        profile: `http://localhost:1337${data[0].url}`
      };
      this.userUpload(user);
    }, error => {
      console.log('ERROR :: ', error);
    });
  }
  userUpload(user: any) {

    this.userService.editUser(user, this.id).subscribe((data) => {
      this.profilePath = data.profile;
      this.users.unshift(data);
      if (sessionStorage.getItem('userRole') == '1') {
        this.router.navigateByUrl('user_list');
      }
      else {
        this.router.navigateByUrl('dashboard');
      }
    }, error => {
      console.log('ERROR :: ', error);
    });
  }
  userEdit() {
    sessionStorage.removeItem('photo');
    if (this.paramDataSvc.partnerData) {
      this.profile = this.paramDataSvc.partnerData;
    }
    else {
      this.profile = ''
    }
    if (this.type == '1') {
      this.type = '5';
    }
    else if (this.type == '0') {
      this.type = '6';
    }
    const profile = this.paramDataSvc.userInfo.profile;
    if (profile) {
      this.imageUpload(profile);
    }
    else {
      const user = {
        username: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        dob: this.dobFormat,
        role: this.type,
      };
      this.userUpload(user);
    }
    this.paramDataSvc.clearUserInfo();
  }
  cancelPress() {
    this.router.navigateByUrl('edit_user')
    sessionStorage.removeItem('photo')
  }

}
