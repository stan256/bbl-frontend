import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {User} from '../model/User';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {switchMap, tap} from 'rxjs/operators';
import * as Fingerprint2 from 'fingerprintjs2';
import {JwtRefreshResponse} from "../model/response";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService) {

  }

  login(username: string, password: string): Observable<User> {

    return from(Fingerprint2.getPromise({}))
      .pipe(
        switchMap((value: Array<{ value: string }>) => {
            const values = value.map(component => component.value);
            const hash = Fingerprint2.x64hash128(values.join(''), 31)
            let payload = {
              email: username,
              password: password,
              deviceInfo: {
                deviceId: hash,
                deviceType: 'WEB'
              }
            };
            return this.http.post<User>(`${environment.apiUrl}/auth/login`, payload, httpOptions).pipe(
              tap(user => {
                localStorage.setItem('deviceId', payload.deviceInfo.deviceId);
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('accessToken', user.accessToken)
                localStorage.setItem('refreshToken', user.refreshToken)
              })
            )
          }
        )
      )
  }

  registration(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/registration`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    const accessToken = getAccessToken();
    return !this.jwtHelper.isTokenExpired(accessToken);
  }

  public setRefreshToken(token: string) {
    localStorage.setItem("refreshToken", token);
  }

  public getRefreshToken(): string {
    return localStorage.getItem("refreshToken");
  }

  public setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  public isAccessTokenExpired(): boolean {
    let accessToken = getAccessToken();
    return this.jwtHelper.isTokenExpired(accessToken);
  }

  refreshAccessToken(): Observable<JwtRefreshResponse> {
    return this.http.post<User>(`${environment.apiUrl}/auth/refresh`,
      {
        refreshToken: this.getRefreshToken()
      },
      httpOptions).pipe(
      tap(jwtRefreshResponse => {
        this.setAccessToken(jwtRefreshResponse.accessToken);
        this.setRefreshToken(jwtRefreshResponse.refreshToken);
      })
    )
  }
}

// Used in JwtModule.forRoot()
export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
