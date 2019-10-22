import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/User';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  registration(user: User) {
    return this.http.post(`${config.apiUrl}/users/registration`, user);
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/users/${id}`);
  }
}
