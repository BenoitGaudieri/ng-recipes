import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
// import { AuthService } from '../auth/auth.service';
// import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    // private dataStorateService: DataStorageService,
    // private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    // this.dataStorateService.storeRecipes();
    this.store.dispatch(RecipeActions.storeRecipes());
  }

  onFetchData() {
    // this.dataStorateService.fetchRecipes().subscribe();
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(AuthActions.logout());
  }
}
