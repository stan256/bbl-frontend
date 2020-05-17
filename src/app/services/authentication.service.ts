import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/User';
import {environment} from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {first, tap} from 'rxjs/operators';
import {tokenGetter} from '../app.module';

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

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/login`,
      {
        email: username,
        password: password
      }, httpOptions).pipe(
        tap(user => localStorage.setItem('currentUser', JSON.stringify(user)))
    );
  }

  registration(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/registration`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    const accessToken = tokenGetter();
    return !this.jwtHelper.isTokenExpired(accessToken);
  }
}
