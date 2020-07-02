import {Injectable} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {User} from '../model/User';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {first, flatMap, mergeMap, tap} from 'rxjs/operators';
import * as Fingerprint2 from 'fingerprintjs2';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService,
  ) {
  }

  login(username: string, password: string): Observable<User> {
    let payload = {
      email: username,
      password: password,
      deviceInfo: {
        deviceId: null,
        deviceType: "WEB"
      }
    }

    let fingerprint2Promise = Fingerprint2.getPromise({}, (fingerprint, components) => {
      payload.deviceInfo.deviceId = fingerprint;
    });

    return from(fingerprint2Promise).pipe(
      flatMap(c => {
        console.log("components", c)
        return this.http.post<User>(`${environment.apiUrl}/auth/login`, payload, httpOptions).pipe(
          tap(user => {
            localStorage.setItem('deviceId', payload.deviceInfo.deviceId);
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('accessToken', user.accessToken)
            localStorage.setItem('refreshToken', user.refreshToken)
          })
        );
      })
    )
  }

  registration(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/registration`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    const accessToken = tokenGetter();
    return !this.jwtHelper.isTokenExpired(accessToken);
  }

  public setRefreshToken(token: string) {
    localStorage.setItem("refreshToken", token);
  }

  public setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  public isRefreshTokenExpired(): boolean {
    let refreshToken = localStorage.getItem("refreshToken");
    return this.jwtHelper.isTokenExpired(refreshToken);
  }

  public isAccessTokenExpired(): boolean {
    let accessToken = localStorage.getItem("accessToken");
    return this.jwtHelper.isTokenExpired(accessToken);
  }
}

export function tokenGetter() {
  return localStorage.getItem("accessToken");
}
