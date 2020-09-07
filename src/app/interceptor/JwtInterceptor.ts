import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService, getAccessToken} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {tryCatch} from "rxjs/internal-compatibility";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;

  constructor(private userService: UserService,
              private authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = getAccessToken();

    if (accessToken) {

      if (this.authService.isAccessTokenExpired() && !this.isRefreshing) {
        const refreshToken = this.authService.getRefreshToken();

        if (refreshToken) {
          this.isRefreshing = true;
          this.authService.refreshAccessToken()
            .subscribe(
              r => this.isRefreshing = false,
                error => this.isRefreshing = false);
        } else {
          this.authService.logout();
          return next.handle(request);
        }
      }

      accessToken = getAccessToken();
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
