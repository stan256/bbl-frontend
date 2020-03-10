import { Component } from '@angular/core';
import { Router } from '@angular/router';
import './app.component.scss';
import {User} from './model/User';
import {AuthenticationService} from './services/authentication.service';
import {AlertService} from './alert/alert.service';

@Component({
    selector: 'app',
    styleUrls: ['./app.component.scss'],
    templateUrl: 'app.component.html'
  })
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  successAlert() {
    this.alertService.success('Success authentication')
  }

  errorAlert() {
    this.alertService.error('Error authentication')
  }
}
