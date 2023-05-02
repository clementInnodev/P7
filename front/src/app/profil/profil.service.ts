import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Subject, catchError } from "rxjs";

@Injectable({ providedIn: 'root'})
export class ProfilService {
    public userId: number

    constructor(private http: HttpClient){}

    modifyPassword(password: string, confirmation: string){
        const body = {
            password,
            confirmation
        }
        return this.http.put<{message: string}>(`http://localhost:3000/user/modify-password`, body)
    }

    deleteProfil(userId: number){
        return this.http.delete<{message: string}>(`http://localhost:3000/user/${userId}`)
            .pipe(
                catchError(response => {
                    console.log(response.error)
                    return EMPTY
                })
            )
    }
}