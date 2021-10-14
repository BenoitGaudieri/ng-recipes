/**
 * Obsolete:
 * the whole logic is now handled by NGRX.
 * This file is here for reference only.
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

// This service uses another service so we need the Injectable decorator
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  // by adding an accessor in front of an argument typescript will automatically create a property of the same name
  // and assign the argument to it
  constructor(
    // private authService: AuthService
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(environment.API_RECIPE, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  // This is a method that we can use to store recipes to the server avoid the no ingredients bug
  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.API_RECIPE).pipe(
      map((recipes) => {
        //   js array map
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        // this.recipeService.setRecipes(recipes);
        this.store.dispatch(new RecipesActions.SetRecipes(recipes));
      })
    ); // pipe end
  }

  //   Simpler version of the above method bugged if there are no ingredients
  fetchRecipes2() {
    this.http.get<Recipe[]>(environment.API_RECIPE).subscribe((recipes) => {
      this.recipeService.setRecipes(recipes);
    });
  }
}
