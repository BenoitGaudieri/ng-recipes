import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

// This service uses another service so we need the Injectable decorator
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  // by adding an accessor in front of an argument typescript will automatically create a property of the same name
  // and assign the argument to it
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(environment.API_RECIPE, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  // This is a method that we can use to store recipes to the server avoid the no ingredients bug
  fetchRecipes() {
    // only take one value from the subject (our user so we can get the token) and then unsubscribe automatically
    // exhaustMap waits for the first observable to complete before subscribing to the next
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(environment.API_RECIPE, {
          params: new HttpParams().set('auth', user.token),
        });
      }),
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
        this.recipeService.setRecipes(recipes);
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
