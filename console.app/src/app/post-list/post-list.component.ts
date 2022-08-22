import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserListService } from '../service/user-list.service';
import { User } from '../models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  public posts: any = [];
  public csvPosts: any = [];
  public userArray: any = [];
  private resp: string = '';
  userRole = sessionStorage.getItem('userRole');
  userId = sessionStorage.getItem('userId');
  formula: string = "Post List";
  post2Col: any = [];
  tableArray: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['title', 'description', 'created_at','updated_at', 'edit', 'delete'];
  public dataSource = new MatTableDataSource<User>();
  private status: any = [];
  private post: any = [];


  searchTitle: string = '';
  searchDes: string = '';

  constructor(
    private userSvc: UserListService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private postService: PostService,
  ) {
    sessionStorage.removeItem('photo');
  }



  ngOnInit(): void {
    this.getPostList();
    console.log(this.dataSource)
  }
  getPostList(): void {
    this.userSvc.getPostList().subscribe(posts => {
      this.posts = posts;
      this.toDataArray();
      this.showData();
      this.toArray();
    }, error => {
      console.log('ERROR :: ', error);
    });
  }
  toDataArray() {
    this.tableArray = [];
    this.posts.data.forEach((value: any) => {
      var obj = {
        id: value.id,
        title: value.attributes.title,
        description: value.attributes.description,
        created_at: value.attributes.createdAt,
        updated_at: value.attributes.updatedAt,
        createUserId: value.attributes.createUserId
      }
      this.tableArray.push(obj)

    });
  }
  toArray() {
    this.post2Col = [];
    this.posts.data.forEach((value: any) => {
      var obj = {
        title: value.attributes.title,
        description: value.attributes.description
      }
      this.post2Col.push(obj)

    });
  }

  downloadCsv(): void {
    this.status = ["approved", "rejected", "pending"];
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: ['Title', 'Description']
    };

    new AngularCsv(this.post2Col, this.formula, options);

  }



  openDialog(id: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deletePost(id)
        this.snackBar.open('The post is successfully deleted.', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  deletePost(id: any): void {
    this.userSvc.deletePost(id).subscribe(resp => {
      this.resp = resp;
      this.getPostList();
      this.searchTitle = '';
      this.searchDes = '';
    }, error => {
      console.log('ERROR ::', error)
    });
  }
  applyFilter() {
    const filterValue = this.searchTitle;
    const filterValue01 = this.searchDes;
    if (!filterValue) {
      this.dataSource.filter = filterValue01.trim().toLowerCase()
    }
    else if (!filterValue01) {
      this.dataSource.filter = filterValue.trim().toLowerCase()
    }
    else if (filterValue01 && filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase() && filterValue01.trim().toLowerCase();
    }
  }

  // search() {
  //   if (this.searchTitle == '' && this.searchDes == '') {
  //     this.getPostList();
  //   }
  //   else {
  //     const arr = {
  //       'title': this.searchTitle,
  //       'description': this.searchDes,
  //     }
  //     this.postService.searchPost(arr).subscribe((post: Post) => {
  //       this.post = post;
  //       this.dataSource = new MatTableDataSource(this.post);
  //       this.dataSource.paginator = this.paginator;
  //     }, error => {
  //       console.log('ERROR :: ', error);
  //     });
  //   }
  // }
  showData(): void {
    this.dataSource = new MatTableDataSource(this.tableArray);
    this.dataSource.paginator = this.paginator;

  }
  showSearchData(): void {
    this.dataSource = new MatTableDataSource(this.userArray);
    this.dataSource.paginator = this.paginator;
  }

  editPost(id: string) {
    sessionStorage.setItem('editPostId', id)
    this.router.navigateByUrl('post_edit')
  }
  toPostList() {
    this.getPostList();
    this.searchTitle = '';
    this.searchDes = '';
  }


}
