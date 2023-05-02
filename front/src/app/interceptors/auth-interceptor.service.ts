import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private http: HttpClient, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token')
        let authRequest: HttpRequest<any>
        if(token){
            authRequest = req.clone({
                headers: req.headers.append('authorization', `Bearer ${token}`)
            })
        }else{
            authRequest = req
        }
        return next.handle(authRequest)
    }
}