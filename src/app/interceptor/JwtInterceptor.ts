import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {catchError, switchMap} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // todo Нужно ли это ?
    if (request.url.indexOf('refresh') !== -1) {
      return next.handle(request);
    }

    const accessExpired = this.authService.isAccessTokenExpired();
    const refreshExpired = this.authService.isRefreshTokenExpired();

    if (accessExpired && refreshExpired) {
      return next.handle(request);
    }
    if (accessExpired && !refreshExpired) {
      if (!this.refreshTokenInProgress) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);
        return this.authService.requestAccessToken().pipe(
          switchMap((authResponse) => {
            this.authService.setAccessToken(authResponse.accessToken);
            this.authService.saveToken(AuthService.REFRESH_TOKEN_NAME, authResponse.refreshToken);
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(authResponse.refreshToken);
            return next.handle(this.injectToken(request));
          }),
        );
      } else {
        return this.refreshTokenSubject.pipe(
          filter(result => result !== null),
          take(1),
          switchMap((res) => {
            return next.handle(this.injectToken(request))
          })
        );
      }
    }

    if (!accessExpired) {
      return next.handle(this.injectToken(request));
    }
  }

  injectToken(request: HttpRequest<any>) {
    const token = this.authService.getToken(AuthService.TOKEN_NAME);
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
