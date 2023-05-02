import { Component, Input, OnInit } from '@angular/core';
import { Observable, filter } from 'rxjs';

import { UserModel } from '../../user.model';
import { UsersService } from '../../users.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    userSelectedId$: Observable<number>

    @Input() user: UserModel

    constructor(private usersService: UsersService){}

    ngOnInit(): void {
        this.userSelectedId$ = this.usersService.userSelectedId$.pipe(filter(userSelected => !!userSelected));
    }
}
