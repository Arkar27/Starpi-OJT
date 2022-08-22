import { Component, OnInit } from '@angular/core';
import { UserListService } from '../service/user-list.service';
import { User } from '../models/models';
import { Router } from '@angular/router';
import { ParamDataService } from '../service/param-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {
  public users : User[]=[];
  create_user_id = sessionStorage.getItem('userId')
  name = sessionStorage.getItem('userName');
  email = sessionStorage.getItem('userEmail');
  password = sessionStorage.getItem('userPassword');
  type = sessionStorage.getItem('userType');
  phone = sessionStorage.getItem('userPhone');
  dob = sessionStorage.getItem('userDob');
  address = sessionStorage.getItem('userAddress');
  url = sessionStorage.getItem('photo');
  imagePath = sessionStorage.getItem('imageDetail');
  public profile: any;
  dobFormat = moment(this.dob).format('YYYY-MM-DD');
  constructor(
    private userService: UserListService,
     private router: Router,
     private paramDataSvc: ParamDataService
     ) {
  }
  ngOnInit(): void {
  }
  imageUpload(profile:any){
    this.userService.uploadProfile(profile).subscribe((data) => {
      this.users.unshift(data);
        const user = {
          username: this.name,
          email: this.email,
          password: this.password,
          phone:this.phone,
          address:this.address,
          dob:this.dobFormat,
          role: this.type,
          image: data[0].id,
          profile: `http://localhost:1337${data[0].url}`
        };
        this.userUpload(user);
      // this.paramDataSvc.fileId = data[0].id;
      // this.userService.getImageInfo(this.fileLocation).subscribe((data) => {
      //   // this.fileLocation = data
      //   console.log('from getImageInfo==>',data.url)
      //   this.users.unshift(data);
      //   const user = {
      //     username: this.name,
      //     email: this.email,
      //     password: this.password,
      //     phone:this.phone,
      //     address:this.address,
      //     dob:this.dobFormat,
      //     role: this.type,
      //     image: this.fileLocation,
      //     profile: `http://localhost:1337${data.url}`
      //   };
      //   this.userUpload(user);
        
      // }, error => {
      //   console.log('ERROR :: ', error);
      // });
      
  }, error => {
    console.log('ERROR :: ', error);
  });
  }
  userUpload(user:any){
    this.userService.addUser(user).subscribe((data) => {
      this.users.unshift(data);
      this.router.navigateByUrl('user_list')
  }, error => {
    console.log('ERROR :: ', error);
  });
  }
  useradd() {
    sessionStorage.removeItem('photo');
    
    if(this.paramDataSvc.partnerData){
      this.profile = this.paramDataSvc.partnerData;
    }
    else{
      this.profile = ''
    }
    if(this.type== '1'){
      this.type = '5';
    }
    else if(this.type == '0'){
      this.type = '6';
    }
  const profile = this.paramDataSvc.userInfo.profile;
  if(profile){
    this.imageUpload(profile);
  }
  else{
    const user = {
      username: this.name,
      email: this.email,
      password: this.password,
      phone:this.phone,
      address:this.address,
      dob:this.dobFormat,
      role: this.type,
      profile: "No profile."
    };
    this.userUpload(user);
  }
  this.paramDataSvc.clearUserInfo();
  }
  cancel() {
    sessionStorage.removeItem('photo');
    this.router.navigateByUrl('create_user')
  }
  

}
