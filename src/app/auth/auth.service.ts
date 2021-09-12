import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(environment.SIGNUP_API + environment.API_KEY, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occured!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exist';
              break;
            default:
              errorMessage = `Something went wrong: ${errorRes.error.error.message}`;
              break;
          }
          return throwError(errorMessage);
        })
      );
  }
}
