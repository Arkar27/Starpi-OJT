import { Component,OnInit, ViewChild } from '@angular/core';
import { UserListService } from '../service/user-list.service';
import { User } from '../models/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LoginAuthService } from '../service/login-auth.service';
import { ParamDataService } from '../service/param-data.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
   searchName: string ='';
   searchEmail: string = '';
   searchDob: any = null;
  searchForm!:FormGroup;
  public users:any = [];
  public user: any = [];
  public userList: any = [];
  public userArray: any = [];
  private resp: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  
  public displayedColumns: string[] = [ 'id', 'username', 'email',  'phone','dob','address','createdAt','updatedAt','edit','delete'];
  public dataSource = new MatTableDataSource<User>();
  
  

  constructor(
    private userSvc: UserListService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private paramData: ParamDataService
    ) {
    sessionStorage.removeItem('photo');
    }
     
     

  ngOnInit(): void {
    sessionStorage.removeItem('isNavBtn');
    this.getUserList();
  }
  

  getUserList(): void {
    this.users = [];
    this.userSvc.getUserList().subscribe(users => {
      this.users = users;
      this.showData();
    }, error => {
      console.log('ERROR :: ', error);
    });
  }
  openDialog(id: any) {
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser(id)
        this.snackBar.open('The user is successfully deleted.', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  
  deleteUser(id:any): void {
    this.userSvc.deleteUser(id).subscribe(resp => {
      this.resp = resp;
      this.searchName = '';
      this.searchEmail = '';
      this.searchDob = '';
      this.getUserList();
    },error =>{
      console.log('ERROR ::', error)
    });
  }

  applyFilter() {
    if (this.searchName == '' && this.searchEmail == '' && this.searchDob == null) {
      this.getUserList();
    }
    const filterName = this.searchName;
    const filterEmail = this.searchEmail;
    const filterDob = this.searchDob;
    const dobFormat = moment(filterDob).format('YYYY-MM-DD');
    
    if(filterName && filterEmail && filterDob){
      this.dataSource.filter = filterName.trim().toLowerCase() || filterEmail.trim().toLowerCase() || dobFormat.trim().toLocaleLowerCase();
    }
    else if(filterName && !filterEmail && filterDob){
      this.dataSource.filter = filterName.trim().toLowerCase() || dobFormat.trim();
    }
    else if(filterName && filterEmail && !filterDob){
      this.dataSource.filter = filterName.trim().toLowerCase() || filterEmail.trim().toLowerCase();
    }
    else if(!filterName && !filterEmail){
      this.dataSource.filter = dobFormat.trim();
    }
    else if(!filterName && !filterDob){
      this.dataSource.filter = filterEmail.trim().toLowerCase();
    }
    else if(!filterEmail && !filterDob){
      this.dataSource.filter = filterName.trim().toLowerCase();
    }
    else if(!filterName && filterEmail && filterDob){
      this.dataSource.filter = filterEmail.trim().toLowerCase() || dobFormat.trim();
    }
    
    
    
    
  }

  // search() {
  //   let searchDate = moment(this.searchDob).format('YYYY-MM-DD');
  //   console.log(this.searchName)
  //   console.log(this.searchEmail)
  //   console.log(this.searchDob)
  //   if (this.searchName == '' && this.searchEmail == '' && this.searchDob == null) {
  //     this.getUserList();
  //   }
  //   else {
  //     const arr = {
  //       'name': this.searchName,
  //       'email': this.searchEmail,
  //       'date': searchDate
  //     }
  //     this.userSvc.searchUser(arr).subscribe((users: User) => {
  //       this.users = users;
        
  //       this.dataSource = new MatTableDataSource<User>(this.users);
  //       this.dataSource.paginator = this.paginator;
  //     }, error => {
  //       console.log('ERROR :: ', error);
  //     });
  //   }
  // }
  toUserList(){
    this.getUserList();
    this.searchName = '';
    this.searchEmail = '';
    this.searchDob = null;

  }
  showData(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    
  }
  showSearchData(): void {
    this.dataSource = new MatTableDataSource(this.userArray);
    this.dataSource.paginator = this.paginator;
    
  }

  editUser(id:string){
    sessionStorage.setItem('editId', id);
    this.router.navigateByUrl('edit_user')
  }
  

  

}
