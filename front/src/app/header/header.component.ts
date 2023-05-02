import { Component, OnInit } from '@angular/core';
import { UserModel } from '../users/user.model';
import { AuthService } from '../auth/auth.service';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService){}

  isLogin: boolean = false
  
  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if(!token){
      this.isLogin = false
    }else{
      this.authService.isAuth(token)
        .pipe(
          tap(isUserLogin => {
            this.isLogin = true
          }),
          catchError(err => {
            console.log(err)
            localStorage.clear()
            this.isLogin = false
            return EMPTY
          })
        )
        .subscribe()
    }
    
    this.authService.isLoginSubject$
      .pipe(
        tap(isUserLogin => {
          this.isLogin = isUserLogin
        }),
        catchError(err => {
          console.log("herrre")
          console.log(err)
          localStorage.clear()
          this.isLogin = false
          return EMPTY
        })
      )
      .subscribe()
  }
}
