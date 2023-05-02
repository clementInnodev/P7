import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserCreationModel, UserModel } from '../../users/user.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @Input() display: boolean
  
  mailAlreadyUsed: boolean = false
  formSubmitted: boolean = false

  constructor(private authService: AuthService){}

  onSubmitForm(form: NgForm){
    if(form.valid){
      const user = form.value as UserCreationModel
      this.authService.createUser(user)
        .subscribe(response => {
          console.log(response)
          this.formSubmitted = true
          this.mailAlreadyUsed = false
        }, response => {
          console.log(response)
          if(response.status === 400){
            for(const validationError of response.error.validationErrors){
              if(validationError.param === "email"){
                this.mailAlreadyUsed = true
              }
            }
          }
        })
    }
  }

}
