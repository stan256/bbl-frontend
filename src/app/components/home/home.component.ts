import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {User} from '../../model/User';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {
  }
}
