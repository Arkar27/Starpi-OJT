import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserListService } from '../service/user-list.service';
import * as moment from 'moment';
import { SnackbarService } from '../service/snackbar.service';
import { ParamDataService } from '../service/param-data.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  reactiveForm !: FormGroup;
  public user: any = [];
  hide = true;
  conPw: string = '';
  pw: string = '';
  userName: string = '';
  mail: string = '';
  arraydata: FormData[] = [];
  id = sessionStorage.getItem('editId')!;
  nrSelect: string = '';
  nrDate: string = '';
  updateDob: string = '';
  public isGoodResolution: boolean = false;
  public url: any;

  public prevImagePath: any;
  today = new Date();
  todayDate = moment(this.today).format('YYYY-MM-DD')
  checkProfile: any;
  samplePath: any;
  public role: string = '';
  dobData: string = '';
  isNavBtn = sessionStorage.getItem('isNavBtn')
  ofNormal: any;
  imageData: any;


  constructor(
    private router: Router,
    private userSvc: UserListService,
    private snackBarSvc: SnackbarService,
    private paramDataSvc: ParamDataService,
  ) {
    if (!localStorage.getItem('fool1')) {
      localStorage.setItem('fool1', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('fool1')
    }

    this.samplePath = "../../assets/sample-profile.png"
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),

      date: new FormControl(null, [
        Validators.required,

      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern("^((\\+95-?)|0)?[0-9]{10}$")
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(250)
      ]),
      type: new FormControl(null, [
        Validators.required
      ]),

    },
    );
  }

  ngOnInit(): void {
    this.getUserDetail(this.id);

  }


  get email() {
    return this.reactiveForm.get('email')!;
  }
  get name() {
    return this.reactiveForm.get('name');
  }

  get date() {
    return this.reactiveForm.get('date')
  }
  get phone() {
    return this.reactiveForm.get('phone');
  }
  get address() {
    return this.reactiveForm.get('address');
  }
  get type() {
    return this.reactiveForm.get('type');
  }
  toConfirm() {

    let form = this.reactiveForm.value

    sessionStorage.setItem('userName', form.name);
    sessionStorage.setItem('userEmail', form.email);
    sessionStorage.setItem('userPassword', form.password);
    sessionStorage.setItem('userType', form.type);
    sessionStorage.setItem('userPhone', form.phone);
    this.updateDob = moment(form.date).format('YYYY-MM-DD')
    sessionStorage.setItem('userDob', this.updateDob);
    sessionStorage.setItem('userAddress', form.address);
    let obj = {
      userame: form.name,
      email: form.email,
      password: form.password,
      profile: this.imageData,

    };
    this.paramDataSvc.setUserInfo(obj);
    this.checkEmail(form.email)

  }
  checkEmail(email: string): void {
    let isThere = false;
    this.userSvc.checkEmail().then(res => {
      res.forEach((value: any) => {
        if (email == value.email) {
          if (this.id == value.id) {
            this.router.navigateByUrl('confirm_edit_user');
          }
          else {
            isThere = true;
          }
        }

      });
      if (isThere == false) {
        this.router.navigateByUrl('confirm_edit_user')
      }
      else {
        alert("The title is already exist.")
      }
    }).catch(error => {
      console.log('error ', error);
    });



  }
  getUserDetail(id: string) {
    this.userSvc.getUserDetail(id).subscribe(user => {
      this.user = user;
      sessionStorage.setItem('profilePath', this.user.profile)
      if (sessionStorage.getItem('isNavBtn')) {
        if (user.role.type == 'admin') {
          this.nrSelect = '1';
        }
        else {
          this.nrSelect = '0'
        }
      }
      else {
        this.userSvc.forUserRole().subscribe(res => {
          res.forEach((value: any) => {
            if (id == value.id) {
              this.role = value.role.type;
              if (this.role == 'admin') {
                this.nrSelect = '1';
              }
              else {
                this.nrSelect = '0'
              }
            }
          })
        });
      }
      let lookProfile = this.user.profile
      if (!lookProfile) {
        this.checkProfile = '1'
      }
      else {
        this.checkProfile = '0'
      }
      sessionStorage.setItem('checkProfile', this.checkProfile)
    }, error => {
      console.log('ERROR :: ', error);
    });
  }
  passwordrest() {
    sessionStorage.getItem('editId');
    this.router.navigateByUrl('passwordreset')
  }

  onChangeImage(event: any) {
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    const filesToUpload = (event.target.files);
    var splitted = filesToUpload[0].name.split(".");
    if (splitted[1] != 'png' && splitted[1] != 'jpg' && splitted[1] != 'jpeg' && splitted[1] != 'gif') {
      alert('This is not an image.')
      location.reload()
    }
    else {
      sessionStorage.setItem('imageDetail', filesToUpload)
      Img.src = URL.createObjectURL(filesToUpload[0]);
      Img.onload = (e: any) => {
        const height = e.path[0].height;
        const width = e.path[0].width;
        if (width < 100 && height < 100) {
          this.snackBarSvc.open('full resolution is not included in Your Uploaded File ', 100);
          this.isGoodResolution = false;
          this.url = '';
        } else {
          this.isGoodResolution = true;
          var reader = new FileReader();
          this.imageData = filesToUpload[0];
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (_event) => {
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
