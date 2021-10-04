import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  //   Add the token to the request
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      // only take one value from the subject (our user so we can get the token) and then unsubscribe automatically
      // exhaustMap waits for the first observable to complete before subscribing to the next
      take(1),
      map((authState) => {
        return authState.user;
      }),
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
