import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {HttpClient} from "@angular/common/http";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {
  }

  test() {
    this.http.get('http://localhost:8080/api/private/').subscribe(value => {
      console.log(value);
    });
  }
}
