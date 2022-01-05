/**
 * Most of the old code has been moved to auth.effects.ts
 * This is now only used to handle the token expiration logic
 * Maximilian Schwarzmüller says that it's easier this way
 * The rest of the code is in  previous commits
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store<fromApp.AppState>) {}
  private tokenExpirationTimer: any;

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
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
