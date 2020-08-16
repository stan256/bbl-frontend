import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService, getAccessToken} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService,
              private authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = getAccessToken();

    if (accessToken) {
      let isRefreshing = false;

      if (this.authService.isAccessTokenExpired()) {
        const refreshToken = this.authService.getRefreshToken();

        if (refreshToken) {
          isRefreshing = true;

          this.authService.refreshAccessToken()
            .subscribe(r => isRefreshing = false);
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
