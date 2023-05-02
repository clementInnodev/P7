import { Component, HostListener, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { UserModel } from 'src/app/users/user.model';
import { ResponseError } from 'src/app/types & interfaces/errors';
import { EMPTY, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() display: boolean

  successMessage: string
  errorMessage: string

  constructor(private authService: AuthService, private router: Router){}

  onSubmitForm(form: NgForm){
    if(form.valid){
      const formValue: {email: string, password: string} = form.value
      this.authService.login(formValue.email, formValue.password)
        .pipe(
          tap(response => {
            if(!response.user.confirmed){
              this.router.navigate(['auth', 'login'])
              form.resetForm()
            }else{
              this.errorMessage = null
              this.successMessage = response.message
              localStorage.setItem('token', response.token)
              localStorage.setItem('user', JSON.stringify(response.user))
              this.authService.isLoginSubject$.next(true)
              setTimeout(() => {
                this.router.navigate(["/"])
              }, 1000);
            }
          }),
          catchError((response: ResponseError) => {
            console.log(response.error)
            this.errorMessage = response.error.message
            return EMPTY
          }),
        
        )
        .subscribe()
    }
  }
}
