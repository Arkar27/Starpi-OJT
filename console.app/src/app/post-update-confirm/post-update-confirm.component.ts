import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/models';
import { UserListService } from '../service/user-list.service';

@Component({
  selector: 'app-post-update-confirm',
  templateUrl: './post-update-confirm.component.html',
  styleUrls: ['./post-update-confirm.component.css']
})
export class PostUpdateConfirmComponent implements OnInit {

  public posts: Post[] = []
  title = sessionStorage.getItem('postTitle');
  description = sessionStorage.getItem('postDescription');

  constructor(
    private userService: UserListService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  postUpdate() {
    const post = {
      data: {
        title: this.title,
        description: this.description,
        ownerId: sessionStorage.getItem('userId'),
        status: sessionStorage.getItem('postStatus')
      }
    };
    const id = sessionStorage.getItem('editPostId')!;

    this.userService.editPost(id, post).subscribe((data) => {
      this.posts.unshift(data);
      this.router.navigateByUrl('post_list')
    }, error => {
      console.log('ERROR :: ', error);
    });

  }

}
