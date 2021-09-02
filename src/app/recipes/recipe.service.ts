import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test recipe',
      'this is a test',
      'https://blog.giallozafferano.it/inventaricette/wp-content/uploads/2020/04/panino-con-hamburger-fb.jpg',
      [new Ingredient('Meat', '1'), new Ingredient('French Fries', '21')]
    ),
    new Recipe(
      'Test 2',
      'this is another test',
      'https://blog.giallozafferano.it/inventaricette/wp-content/uploads/2020/04/panino-con-hamburger-fb.jpg',
      [new Ingredient('Cheese', '1'), new Ingredient('Bread', '2')]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    //   we use slice to return a copy of the array and not the actual array
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
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
