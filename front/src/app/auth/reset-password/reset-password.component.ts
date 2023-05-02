import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "../auth.service";
import { EMPTY, catchError, tap } from "rxjs";

@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: [
        "./reset-password.component.scss"
    ]
})
export class ResetPasswordComponent implements OnInit {
    errorMessage: string
    token: string
    validationMessage: string

    constructor(private route: ActivatedRoute, private authService: AuthService){}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.token = params['token']
        })
    }

    onSubmitForm(f: NgForm){
        if(f.valid){
            const passwords: {password: string, confirmation: string} = f.value
            if(passwords.password !== passwords.confirmation){
                this.errorMessage = "Veuillez renseigner deux mots de passe identiques"
            }else{
                this.authService.resetPassword(passwords.password, passwords.confirmation, this.token)
                    .pipe(
                        tap(response => {
                            this.validationMessage = response.message
                            f.resetForm()
                        }),
                        catchError(err => {
                            console.log(err)
                            this.errorMessage = err.error.message
                            return EMPTY
                        })
                    )
                    .subscribe()
            }
        }
        console.log(f)
    }

}