import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';7
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserComponent } from './users/users-list/user/user.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostComponent } from './posts/posts-list/post/post.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ConfirmComponent } from './auth/confirm/confirm.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilDetailComponent } from './profil/profil-detail/profil-detail.component';
import { ModifyPasswordComponent } from './profil/modify-password/modify-password.component';
import { ForgottenPasswordComponent } from './auth/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { ProfilPostsComponent } from './profil/profil-posts/profil-posts.component';
import { ProfilPostComponent } from './profil/profil-posts/profil-post/profil-post.component';
import { ProfilPostsFormComponent } from './profil/profil-posts/profil-posts-form/profil-posts-form.component';
import { HomeArticleFormComponent } from './home/home-article-form/home-article-form.component';
import { HomeArticleListComponent } from './home/home-article-list/home-article-list.component';
import { ArticleComponent } from './home/home-article-list/article/article.component';
import { DeletePostConfirmationComponent } from './posts/delete-confirmation/delete-post-confirmation.component';

import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostsComponent,
    UsersComponent,
    UsersListComponent,
    UserComponent,
    UserDetailComponent,
    SignupComponent,
    PostsListComponent,
    PostComponent,
    AuthComponent,
    LoginComponent,
    ConfirmComponent,
    NotFoundComponent,
    ProfilComponent,
    ProfilDetailComponent,
    ModifyPasswordComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
    EditProfilComponent,
    PostFormComponent,
    ProfilPostsComponent,
    ProfilPostComponent,
    ProfilPostsFormComponent,
    HomeArticleFormComponent,
    HomeArticleListComponent,
    ArticleComponent,
    DeletePostConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(fr.default)
  }
}
