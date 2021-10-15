/**
 * Most of this code has been moved to auth.effects.ts
 * This is now only used to handle the token expiration logic
 * Maximilian Schwarzmüller says that it's easier this way
 * The rest of the code is still here for reference
 */

// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { catchError, tap } from 'rxjs/operators';
// import { BehaviorSubject, Subject, throwError } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { User } from './model/user.model';
// import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

// export interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    // private http: HttpClient,
    // private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  //   It behaves like a Subject, but also gives subcribed users access to the current value of the subject even after the subject has been completed.
  //   user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  //   signUp(email: string, password: string) {
  //     return this.http
  //       .post<AuthResponseData>(environment.SIGNUP_API + environment.API_KEY, {
  //         email,
  //         password,
  //         returnSecureToken: true,
  //       })
  //       .pipe(
  //         catchError(this.handleError),
  //         tap((resData) => {
  //           this.handleAuthentication(
  //             resData.email,
  //             resData.localId,
  //             resData.idToken,
  //             +resData.expiresIn
  //           );
  //         })
  //       );
  //   }

  //   login(email: string, password: string) {
  //     return this.http
  //       .post<AuthResponseData>(environment.LOGIN_API + environment.API_KEY, {
  //         email,
  //         password,
  //         returnSecureToken: true,
  //       })
  //       .pipe(
  //         catchError(this.handleError),
  //         tap((resData) => {
  //           this.handleAuthentication(
  //             resData.email,
  //             resData.localId,
  //             resData.idToken,
  //             +resData.expiresIn
  //           );
  //         })
  //       );
  //   }

  //   autoLogin() {
  //     const userData: {
  //       email: string;
  //       id: string;
  //       _token: string;
  //       _tokenExpirationDate: string;
  //     } = JSON.parse(localStorage.getItem('userData'));
  //     if (!userData) {
  //       return;
  //     }
  //     const loadedUser = new User(
  //       userData.email,
  //       userData.id,
  //       userData._token,
  //       new Date(userData._tokenExpirationDate)
  //     );

  //     // The token is generated on the user model, so we can check if the token is expired or not
  //     if (loadedUser.token) {
  //       //   this.user.next(loadedUser);
  //       this.store.dispatch(
  //         new AuthActions.AuthenticateSuccess({
  //           email: loadedUser.email,
  //           userId: loadedUser.id,
  //           token: loadedUser.token,
  //           expirationDate: new Date(userData._tokenExpirationDate),
  //         })
  //       );
  //       const expirationDuration =
  //         new Date(userData._tokenExpirationDate).getTime() -
  //         new Date().getTime();
  //       this.autoLogout(expirationDuration);
  //     }
  //   }

  //   logout() {
  //     // this.user.next(null);
  //     this.store.dispatch(new AuthActions.Logout());
  //     // this.router.navigate(['/auth']);
  //     localStorage.removeItem('userData');
  //     if (this.tokenExpirationTimer) {
  //       clearTimeout(this.tokenExpirationTimer);
  //     }
  //     this.tokenExpirationTimer = null;
  //   }

  //   autoLogout(expirationDuration: number) {
  //     this.tokenExpirationTimer = setTimeout(() => {
  //       //   this.logout();
  //       this.store.dispatch(new AuthActions.Logout());
  //     }, expirationDuration);
  //   }

  //   private handleError(errorRes: HttpErrorResponse) {
  //     let errorMessage = 'An unknown error occured!';
  //     if (!errorRes.error || !errorRes.error.error) {
  //       return throwError(errorMessage);
  //     }
  //     switch (errorRes.error.error.message) {
  //       case 'EMAIL_EXISTS':
  //         errorMessage = 'This email already exist';
  //         break;
  //       case 'EMAIL_NOT_FOUND':
  //         errorMessage = 'This email is not registered';
  //         break;
  //       case 'INVALID_PASSWORD':
  //         errorMessage = 'The password is invalid';
  //         break;
  //       case 'USER_DISABLED':
  //         errorMessage = 'The user account has been disabled';
  //         break;
  //       default:
  //         errorMessage = `Something went wrong: ${errorRes.error.error.message}`;
  //         break;
  //     }
  //     return throwError(errorMessage);
  //   }

  //   private handleAuthentication(
  //     email: string,
  //     localId: string,
  //     idToken: string,
  //     expiresIn: number
  //   ) {
  //     const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  //     // this const user must be removed
  //     const user = new User(email, localId, idToken, expirationDate);
  //     // this.user.next(user);
  //     this.store.dispatch(
  //       new AuthActions.AuthenticateSuccess({
  //         email,
  //         userId: localId,
  //         token: idToken,
  //         expirationDate,
  //       })
  //     );
  //     this.autoLogout(+expiresIn * 1000);
  //     localStorage.setItem('userData', JSON.stringify(user));
  //   }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      //   this.logout();
      this.store.dispatch(AuthActions.logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
