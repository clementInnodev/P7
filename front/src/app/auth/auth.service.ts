import { Injectable } from "@angular/core";
import {Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { UserCreationModel, UserModel } from "../users/user.model";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthService {

    isLoginSubject$ = new Subject<boolean>()

    constructor(private http: HttpClient, private router: Router){}

    setLocalStorage(token: string, user: UserModel){
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }

    createUser(user: UserCreationModel){
        return this.http.post<{message: string, user: UserModel}>('http://localhost:3000/auth/signup', user)
    }

    confirmInscription(token: string){
        return this.http.get<{message: string, user: UserModel}>(`http://localhost:3000/auth/confirm-signup/${token}`)
    }

    login(email: string, password: string){
        return this.http.post<{message: string, token: string, user: UserModel}>('http://localhost:3000/auth/login', {email, password})
    }

    isAuth(token: string){
        return this.http.get<{message: string}>(`http://localhost:3000/auth/loged/${token}`)
    }

    resetPassword(password: string, confirmationPassword: string, token: string){
        return this.http.put<{message: string}>(`http://localhost:3000/auth/reset-password`, {password, confirmationPassword, token})
    }

    forgottenPassword(email: string){
        return this.http.post<{message: string}>('http://localhost:3000/auth/forgotten-password', {email})
    }

    logout(){
        localStorage.clear()
        this.isLoginSubject$.next(false)
        this.router.navigate(['/auth/login'])
    }
}