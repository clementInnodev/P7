import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { UsersService } from "../../users/users.service"
import { UserModel, UserUpdateModel } from "src/app/users/user.model";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: "app-edit-profil",
    templateUrl: "./edit-profil.component.html",
    styleUrls: [
        "./edit-profil.component.scss"
    ]
})
export class EditProfilComponent implements OnInit {
    successMessage: string

    user$ : Observable<UserModel>

    constructor(private usersService: UsersService, private router: Router){}

    onSubmitForm(f: NgForm){
        if(f.valid){
            const now = new Date()
            const timezoneOffset = 2
            const timezoneOffsetMs = timezoneOffset * 60 * 60 * 1000
            const frenchDate = new Date(now.getTime() + timezoneOffsetMs)
            const formattedFrenchDate = frenchDate.toISOString().slice(0, 19).replace('T', ' ')
            let values: UserUpdateModel = { 
                ...f.value,
                updateDate: formattedFrenchDate 
            }
            console.log(values)
            this.usersService.updateUser(values)
                .pipe(
                    tap(message => {
                        this.successMessage = message
                        setTimeout(() => {
                            this.router.navigate(['profil', 'detail'])
                        }, 2000)
                    })
                )
                .subscribe()
        }        
    }

    ngOnInit(): void {
        this.user$ = this.usersService.getUser()
    }
}