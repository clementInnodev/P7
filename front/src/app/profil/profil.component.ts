import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { ProfilService } from "./profil.service";

@Component({
    selector: "app-profil",
    templateUrl: "./profil.component.html",
    styleUrls: [
        "./profil.component.scss"
    ]
})
export class ProfilComponent implements OnInit {

    constructor(private authService: AuthService, private route: ActivatedRoute, private readonly profilService: ProfilService){}

    ngOnInit(): void {
    }

    onLogout(){
        this.authService.logout()
    }
}