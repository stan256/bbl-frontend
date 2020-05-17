import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/User';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class UserService implements OnInit{

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {}


  ngOnInit() {}

  getAllUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserById(userId: number): Observable<User> {
    return of(
      {
        id: 1,
        email: "salimova.nellia@gmail",
        firstName: "Nellia",
        lastName: "Salimova",
        token: "token"
      }
    )
  }

  getCurrentUserId(): number {
    const accessToken = localStorage.getItem('access_token');
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(accessToken);
    const expirationDate = helper.getTokenExpirationDate(accessToken);
    const isExpired = helper.isTokenExpired(accessToken);

    return 5;

  }

  getCurrentUser(): User {
    let currentUser = localStorage.getItem('currentUser');

    if (currentUser)
      return JSON.parse(currentUser);
    else
      return null;
  }
}
