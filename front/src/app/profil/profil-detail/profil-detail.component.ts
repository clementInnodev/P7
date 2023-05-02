import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/users/user.model";
import { ProfilService } from "../profil.service";
import { UsersService } from "src/app/users/users.service";
import { EMPTY, Observable, catchError, map, tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: "app-profil-detail",
    templateUrl: "./profil-detail.component.html",
    styleUrls: [
        "./profil-detail.component.scss"
    ]
})
export class ProfilDetailComponent implements OnInit {
    user$: Observable<UserModel>

    showDeleteConfirmation: boolean = false

    constructor(private profilService: ProfilService, private userService: UsersService, private router: Router){}

    ngOnInit(): void {
        this.user$ = this.userService.getUser()
    }

    onDeleteProfil(userId: number){
        this.profilService.deleteProfil(userId)
        .pipe(
            tap(response => {
                localStorage.clear()
                this.router.navigate(['/auth', 'login'])
            })
        )
        .subscribe()
    }
}