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

  // This is a method that we can use to store recipes to the server avoid the no ingredients bug
  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.BASE_API).pipe(
      // rxjs map operator
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
    );
  }

  //   Simpler version of the above method bugged if there are no ingredients
  fetchRecipes2() {
    this.http.get<Recipe[]>(environment.BASE_API).subscribe((recipes) => {
      this.recipeService.setRecipes(recipes);
    });
  }
}
