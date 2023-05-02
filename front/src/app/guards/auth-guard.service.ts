import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = localStorage.getItem('token')
        if(!token){
            this.router.navigate(['/auth/login'])
            return false
        }else{
            this.authService.isAuth(token)
                .pipe(
                    map(isUserLogin => {
                        return true
                    }),
                    catchError(err => {
                        console.log(err)
                        localStorage.clear()
                        this.authService.isLoginSubject$.next(false)
                        this.router.navigate(['/auth/login'])
                        return EMPTY
                    })
                )
                .subscribe()
        }
    }
}