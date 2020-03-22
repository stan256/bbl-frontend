import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/User';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService implements OnInit{
  private currentUser$: Observable<User>;

  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.currentUser$ = this.getUserById(this.getCurrentUserId());
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  registration(user: User) {
    return this.http.post(`${environment.apiUrl}/users/registration`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  getCurrentUserId(): number {
    // todo read from cookie
    return 5;
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
