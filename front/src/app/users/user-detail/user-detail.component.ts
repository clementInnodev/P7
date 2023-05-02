import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'

import { UserModel } from '../user.model';
import { UsersService } from '../users.service';
import { EMPTY, Observable, Subscription, catchError, take, tap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    user$: Observable<UserModel>

    constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router){}

    closeUserDetail(){
        this.usersService.userUnselected$.next()
        this.router.navigate(['users'])
    }

    ngOnInit(): void {
        console.log('work')
        this.route.params
            .pipe(
                // take(1),
            catchError(response => {
                console.log(response.error)
                return EMPTY
            })
            )
            .subscribe( (params: Params) => {
                const userId = params["userId"]
                this.user$ = this.usersService.getUserById(userId)
                this.usersService.userSelectedId$.next(userId)
            })

    
    
  }
}
