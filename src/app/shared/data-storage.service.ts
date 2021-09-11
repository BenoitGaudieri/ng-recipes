import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

// This service uses another service so we need the Injectable decorator
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  // by adding an accessor in front of an argument typescript will automatically create a property of the same name
  // and assign the argument to it
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(environment.BASE_API, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.BASE_API).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        //   this.recipeService.setRecipes(recipes);
      })
    );
  }
}
