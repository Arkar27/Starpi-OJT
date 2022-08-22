import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ParamDataService } from '../service/param-data.service';
import { UserListService } from '../service/user-list.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  reactiveForm!: FormGroup;
  postArray: any = [];
  tmp:any;
  
  constructor(
    private router: Router,
    private userSvc: UserListService,
    private paramData: ParamDataService,
  ) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
    });
  }
  get title() {
    return this.reactiveForm.get('title');
  }
  get description() {
    return this.reactiveForm.get('description');
  }
  toConfirm() {
    let form = this.reactiveForm.value;
    this.paramData.setPostData ({
     postTitle : this.reactiveForm.value.title,
     postDescription: this.reactiveForm.value.description,
    })
    
    sessionStorage.setItem('postTitle', form.title);
    sessionStorage.setItem('postDescription', form.description);

    this.checkPost(this.reactiveForm.value.title);



  }
  checkPost(post: string) {
    this.userSvc.checkPost(post).then(res => {

      let isThere = false;
      res.data.forEach((value: any) => {
        if (post == value.attributes.title) {
          isThere = true;
        }
      });
      if (isThere == false) {
        this.router.navigateByUrl('post_confirm')
      }
      else {
        alert("The title is already exist.")
      }


    }).catch(error => {
      console.log('error ', error);
    });
  }

}
