import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProfilService } from "../profil.service";
import { EMPTY, catchError, map, tap } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: "app-modify-password",
    templateUrl: "./modify-password.component.html",
    styleUrls: [
        "./modify-password.component.scss"
    ]
})
export class ModifyPasswordComponent implements OnInit {
    errorMessage: string
    validationMessage: string

    constructor(private profilService: ProfilService) {}

    ngOnInit(): void {
    }

    onSubmitForm(f: NgForm){
        if(f.valid){
            const passwords: {password: string, confirmation: string} = f.value
            if(passwords.password !== passwords.confirmation){
                this.errorMessage = "Veuillez renseigner deux mots de passe identiques"
            }else{
                this.profilService.modifyPassword(passwords.password, passwords.confirmation)
                    .pipe(
                        tap(response => {
                            this.validationMessage = response.message
                            f.resetForm()
                        }),
                        catchError(err => {
                            console.log(err)
                            this.errorMessage = err.message
                            return EMPTY
                        })
                    )
                    .subscribe()
            }
        }
    }
}