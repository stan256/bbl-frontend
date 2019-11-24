import { Component } from '@angular/core';
import { Router } from '@angular/router';


import './app.component.scss';
import {User} from './model/User';
import {AuthenticationService} from './auth/authentication.service';

@Component({
    selector: 'app',
    styleUrls: ['./app.component.scss'],
    templateUrl: 'app.component.html'
  })
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
