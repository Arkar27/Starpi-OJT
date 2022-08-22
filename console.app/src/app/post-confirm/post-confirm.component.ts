import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/models';
import { ParamDataService } from '../service/param-data.service';
import { UserListService } from '../service/user-list.service';

@Component({
  selector: 'app-post-confirm',
  templateUrl: './post-confirm.component.html',
  styleUrls: ['./post-confirm.component.css']
})
export class PostConfirmComponent implements OnInit {
  public posts: Post[] = []
  title = sessionStorage.getItem('postTitle');
  description = sessionStorage.getItem('postDescription');
  postData:any;

  constructor(
    private userService: UserListService,
    private router: Router,
    private paramData: ParamDataService,
  ) { 
    this.postData = this.paramData.getPostData();
    console.log(this.paramData.getPostData())
  }

  ngOnInit(): void {
  }
  postAdd() {
    const post = {
      data: {
        title: this.title,
        description: this.description,
        createUserId: sessionStorage.getItem('userId')
      }
    };

    this.userService.addPost(post).subscribe((data) => {
      this.posts.unshift(data);
      this.router.navigateByUrl('post_list')
    }, error => {
      console.log('ERROR :: ', error);
    });

  }

}
