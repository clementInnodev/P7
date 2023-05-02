import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UserModel } from "src/app/users/user.model";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-confirm",
    templateUrl: "./confirm.component.html",
    styleUrls: [
        "./confirm.component.scss"
    ]
})
export class ConfirmComponent implements OnInit {
    displayConfirm: boolean = false
    user: UserModel

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){}

    ngOnInit(): void {
        let token: string
        this.route.params.subscribe((params: Params) => {
            token = params['token']
        })
        this.displayConfirm = true

        this.authService.confirmInscription(token)
            .subscribe((response: {message: string, user: UserModel, status: number}) => {
                this.user = response.user
                this.displayConfirm = true
                console.log(response)
            }, error => {
                this.router.navigate(['auth', 'login'])
                console.log(error)
            })
    }
}