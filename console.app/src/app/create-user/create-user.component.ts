import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { FormControl, FormGroup, Validators, NgForm, FormRecord } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../service/snackbar.service';
import { UserListService } from '../service/user-list.service';
import { ParamDataService } from '../service/param-data.service';
// import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  reactiveForm !: FormGroup;
  user!: User;
  isThereImage: boolean = false;
  hide = true;
  conPw: string = '';
  pw: string = '';
  userName: string = '';
  mail: string = '';
  arraydata:FormData [] = [];
  public isGoodResolution: boolean = false;
  public url: any;
  public formData: FormData = new FormData();
  sameEmail: boolean = false;
  today = new Date();
  todayDate = moment(this.today).format('YYYY-MM-DD')
  imageData:any;
  
  constructor(
    private router: Router,
    private snackBarSvc: SnackbarService,
    private userSvc: UserListService,
    private paramDataSvc: ParamDataService,
  ) { 
   }

  ngOnInit(): void {
    
    
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl([
        Validators.required,
        Validators.minLength,
        Validators.maxLength,
        Validators.pattern,
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ]),
      
      date: new FormControl(null,[
        Validators.required,
      ]),
      phone: new FormControl(null,[
        Validators.required,
      ]),
      address: new FormControl(null,[
        Validators.required,
      ]),
      type: new FormControl(null,[
        Validators.required
      ]),
      inputFile:new FormControl(null,[
        Validators.required
      ])
      
    },
    );
    
  }
  get inputFile(){
    return this.reactiveForm.get('inputFile')
  }
  
  
  get email(){
    return this.reactiveForm.get('email')!;
  }
  get name() {
    return this.reactiveForm.get('name');
  }
  get password() {
    return this.reactiveForm.get('password');
  }
  get confirmPassword() {
    return this.reactiveForm.get('confirmPassword')
  }
  get date(){
    return this.reactiveForm.get('date')
  }
  get phone(){
    return this.reactiveForm.get('phone');
  }
  get address(){
    return this.reactiveForm.get('address');
  }
  get type(){
    return this.reactiveForm.get('type')
  }
  toConfirm() {
    let form = this.reactiveForm.value
    sessionStorage.setItem('userName', form.name);
    sessionStorage.setItem('userEmail', form.email);
    sessionStorage.setItem('userPassword', form.password);
    sessionStorage.setItem('userType', form.type);
    sessionStorage.setItem('userPhone', form.phone);
    sessionStorage.setItem('userDob', form.date );
    sessionStorage.setItem('userAddress', form.address);
    let obj ={
      userame: form.name,
      email: form.email,
      password: form.password,
      profile: this.imageData,
    };
    this.paramDataSvc.setUserInfo(obj);
    this.checkEmail(form.email);
   }
  checkEmail(email:string): void {
    this.userSvc.checkEmail().then(res => {
      let isSame = false;
      res.forEach((value: any)=>{
        if(email == value.email){
          isSame = true;
        }
      });
      if(isSame == false){
        this.router.navigateByUrl('confirm_user')
      }
      else{
        alert('Email is already taken.')
      }
    }).catch(error => {
      console.log('error ', error);
    });
  }
  onChangeImage(event: any) {
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    const filesToUpload = (event.target.files);
    var splitted = filesToUpload[0].name.split(".");
    if(splitted[1]!= 'png' && splitted[1]!='jpg' && splitted[1]!='jpeg'&& splitted[1]!='gif'){
      alert('This is not an image.')
      location.reload()
    }
    else{
      sessionStorage.setItem('imageDetail', filesToUpload)
    const file = filesToUpload[0] as HTMLInputElement;
    Img.src = URL.createObjectURL(filesToUpload[0]);
    Img.onload = (e: any) => {
      const height = e.path[0].height;
      const width = e.path[0].width;
      if ( width < 100 && height < 100) {
        this.snackBarSvc.open('full resolution is not included in Your Uploaded File ', 5000);
        this.isGoodResolution = false;
        this.url = '';
      } else {
        this.
        this.isGoodResolution = true;
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.imageData = filesToUpload[0];
          this.url = reader.result;
          sessionStorage.setItem('photo', this.url)
          if (this.url) {
            let solution = this.url.split("base64,")[1];
            this.paramDataSvc.partnerData = solution;
            }
        }
      }
    }
    }
  }

}

