import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  //   Add the token to the request
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      // only take one value from the subject (our user so we can get the token) and then unsubscribe automatically
      // exhaustMap waits for the first observable to complete before subscribing to the next
      take(1),
      exhaustMap((user) => {
        // check if the user is logged in
        // can also be used to check url (req.url)
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
