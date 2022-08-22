import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserListService } from '../service/user-list.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  reactiveForm!: FormGroup;
  post: any = [];
  acSelect: string = '';
  id = sessionStorage.getItem('editPostId')!;
  postData: any;


  constructor(
    private router: Router,
    private userSvc: UserListService,
  ) { }

  ngOnInit(): void {
    this.getPostDetail(this.id);
    this.reactiveForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      status: new FormControl(null, [
        Validators.required
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
    sessionStorage.setItem('postTitle', form.title);
    sessionStorage.setItem('postDescription', form.description);
    sessionStorage.setItem('postStatus', form.status)
    this.checkPost(form.title)

  }
  checkPost(post: string) {
    this.userSvc.checkPost(post).then(res => {

      let isThere = false;
      res.data.forEach((value: any) => {
        if (post == value.attributes.title) {
          if (this.id == value.id) {
            this.router.navigateByUrl('post_update_confirm');
          }
          else {
            isThere = true;
          }

        }
      });
      if (isThere == false) {
        this.router.navigateByUrl('post_update_confirm');
      }
      else {
        alert("The title is already exist.")
      }


    }).catch(error => {
      console.log('error ', error);
    });
  }

  getPostDetail(id: string) {
    this.userSvc.getPostDetail(id).subscribe(post => {
      this.post = post;
      this.postData = this.post.data.attributes;
      if (this.postData.status == '1') {
        this.acSelect = '1';
      }
      else {
        this.acSelect = '0'
      }
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

}

