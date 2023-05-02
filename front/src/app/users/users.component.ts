import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { UsersService } from './users.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {

    userSelected$: Observable<number>

    constructor(private usersService: UsersService){}

    ngOnInit(): void {
        this.userSelected$ = this.usersService.userSelectedId$
    }

}
