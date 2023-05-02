import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Subject, catchError, map, of, startWith, switchMap, timer } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { UserModel, UserUpdateModel } from "./user.model";

@Injectable({
    providedIn: "root"
})
export class UsersService {

    //permet de transmettre l'id de l'utilisateur sélectionner depuis le composant user-detail au composant users et user
    userSelectedId$ = new BehaviorSubject<number | null>(null)

    //permet au composant user-detail d'informer le composant users que l'utilisateur précédemment sélectionné ne l'est plus
    userUnselected$ = new Subject<void>()


    constructor(private http: HttpClient){}

    getUsers(){
        return this.http.get<{message: string, users: UserModel[]}>('http://localhost:3000/users')
            .pipe(
                map(res => res.users),
                catchError( reponse => {
                  console.log(reponse.error)
                  return EMPTY
                })
            )
    }

    getUser(){
        return this.http.get<{message: string, user: UserModel}>(`http://localhost:3000/user`)
            .pipe(
                map(res => res.user),
                catchError(response => {
                    console.log(response.error)
                    return EMPTY
                })
            )
    }

    getUserById(userId: number){
        return this.http.get<{message: string, user: UserModel}>(`http://localhost:3000/user/${userId}`)
            .pipe(
                map(res => res.user),
                catchError(response => {
                    console.log(response.error)
                    return EMPTY
                })
            )
    }

    updateUser(user: UserUpdateModel){
        return this.http.put<{message: string, user: UserModel}>('http://localhost:3000/user', {...user})
            .pipe(
                map(res => res.message),
                catchError(response => {
                    console.log(response.error)
                    return EMPTY
                })
            )
    }
}