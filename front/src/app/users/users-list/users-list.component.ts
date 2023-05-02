import { Component, Input } from '@angular/core';
import { UserModel } from '../user.model';
import { UsersService } from '../users.service';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  //users: UserModel[] = []
  users$: Observable<UserModel[]>

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
      this.users$ = this.usersService.getUsers()
        
  }
}
