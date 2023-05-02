import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { EMPTY, catchError, tap } from "rxjs";

@Component({
    selector: "app-forgotten-password",
    templateUrl: "./forgotten-password.component.html",
    styleUrls: [
        "./forgotten-password.component.scss"
    ]
})
export class ForgottenPasswordComponent {
    public successMessage: string
    public email: string

    constructor(private authService: AuthService){}

    onSubmitForm(f: NgForm){
        if(f.valid){
            this.email = f.value.email
            this.authService.forgottenPassword(this.email)
                .pipe(
                    tap(response => {
                        this.successMessage = response.message
                        f.resetForm()
                    }),
                    catchError(err => {
                        console.log(err)
                        return EMPTY
                    })
                )
                .subscribe()
        }
    }
}