import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {User} from '../model/User';
import {UserService} from '../auth/user.service';
import {AuthenticationService} from '../auth/authentication.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
}
