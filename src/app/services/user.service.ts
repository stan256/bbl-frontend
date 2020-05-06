import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/User';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService implements OnInit{
  private currentUser$: Observable<User>;

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {}


  ngOnInit() {
    this.currentUser$ = this.getUserById(this.authService.getCurrentUserId());
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserById(userId: number): Observable<User> {
    return of(
      {
        id: 1,
        email: "salimova.nellia@gmail",
        password: "12345asd",
        firstName: "Nellia",
        lastName: "Salimova",
        token: "token"
      }
    )
  }
}
