import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from './auth/auth.component';
import { ConfirmComponent } from './auth/confirm/confirm.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilDetailComponent } from './profil/profil-detail/profil-detail.component';
import { ModifyPasswordComponent } from './profil/modify-password/modify-password.component';
import { ForgottenPasswordComponent } from './auth/forgotten-password/forgotten-password.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';

import { AuthGuard } from './guards/auth-guard.service';
import { ProfilPostsComponent } from './profil/profil-posts/profil-posts.component';

const routes: Routes = [
  {path: "", canActivate: [AuthGuard], component: HomeComponent},
  {path: "posts", canActivate: [AuthGuard], component: PostsComponent},
  {path: "users", canActivate: [AuthGuard], component: UsersComponent, children: [
    {path: ":userId", component: UserDetailComponent}
  ]},
  {path: "auth", component: AuthComponent, children: [
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "forgotten-password", component: ForgottenPasswordComponent},
    {path: "reset-password/:token", component: ResetPasswordComponent},
    {path: "confirm/:token", component: ConfirmComponent}
  ]},
  {path: "profil", canActivate: [AuthGuard], component: ProfilComponent, children: [
    {path: "detail", component: ProfilDetailComponent},
    {path: "modify-password", component: ModifyPasswordComponent},
    {path: "edit-profil", component: EditProfilComponent},
    {path: "posts", component: ProfilPostsComponent}
  ]},
  {path: "not-found", component: NotFoundComponent},
  {path: "**", redirectTo: "not-found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
