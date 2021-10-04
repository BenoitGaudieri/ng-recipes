import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  //   private recipes: Recipe[] = [
  //     new Recipe(
  //       'Test recipe',
  //       'this is a test',
  //       'https://blog.giallozafferano.it/inventaricette/wp-content/uploads/2020/04/panino-con-hamburger-fb.jpg',
  //       [new Ingredient('Meat', '1'), new Ingredient('French Fries', '21')]
  //     ),
  //     new Recipe(
  //       'Test avocado',
  //       'this is an avocado test',
  //       'https://www.my-personaltrainer.it/2019/11/18/avocado_900x760.jpeg',
  //       [new Ingredient('Bread', '2'), new Ingredient('Avvocato', '1')]
  //     ),
  //   ];
  private recipes: Recipe[] = [];

  constructor(
    // private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  //   change the recipes with those passed from the data service linked to the server
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    //   we use slice to return a copy of the array and not the actual array
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    // NGRX:
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
