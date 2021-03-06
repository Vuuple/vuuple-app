import { AuthService } from './../../auth/core/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.getCuurentUser();
    console.log(currentUser, 'currentUser');
    // setHeaders: {
    //   Authorization: `Bearer ${currentUser.token}`
    // }
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: ` ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
