import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/User';
import {environment} from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService,
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`,
      {
        email: username,
        password: password
      }, httpOptions)
  }

  registration(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/registration`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(accessToken);
  }
}
