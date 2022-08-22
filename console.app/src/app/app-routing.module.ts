import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard';
import { RoleGuard } from './service/role.guard';
import { UserListComponent } from './user-list/user-list.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ConfirmEditUserComponent } from './confirm-edit-user/confirm-edit-user.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostConfirmComponent } from './post-confirm/post-confirm.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostUpdateConfirmComponent } from './post-update-confirm/post-update-confirm.component';
import { CsvComponent } from './csv/csv.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'dashboard',component: DashboardComponent,canActivate: [AuthGuard],},
  {path:'create_user', component: CreateUserComponent, canActivate:[RoleGuard, AuthGuard]},
  {path: 'user_list',component: UserListComponent,canActivate: [RoleGuard,AuthGuard]},
  {path: 'confirm_user',component: ConfirmUserComponent,canActivate: [RoleGuard,AuthGuard]},
  {path: 'edit_user',component: EditUserComponent,canActivate: [AuthGuard]},
  {path: 'confirm_edit_user',component: ConfirmEditUserComponent,canActivate: [AuthGuard]},
  {path: 'post_list',component: PostListComponent,canActivate: [AuthGuard]},
  {path: 'post_create',component: PostCreateComponent,canActivate: [AuthGuard]},
  {path: 'post_confirm',component: PostConfirmComponent,canActivate: [AuthGuard]},
  {path: 'post_edit',component: PostUpdateComponent,canActivate: [AuthGuard]},
  {path: 'post_update_confirm', component: PostUpdateConfirmComponent,canActivate: [AuthGuard]},
  {path: 'csv_upload', component: CsvComponent,canActivate: [AuthGuard]},
  {path: 'passwordreset', component: PasswordResetComponent,canActivate: [AuthGuard]},
  {path:'**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
