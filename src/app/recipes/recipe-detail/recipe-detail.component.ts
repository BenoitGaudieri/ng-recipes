import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as FromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FromApp.AppState>
  ) {}

  ngOnInit() {
    //  const id = this.route.snapshot.params['id']; //this only works on the first time the component is loaded
    // NGRX first method:
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   //   this.recipe = this.recipeService.getRecipe(this.id);
    //   this.store
    //     .select('recipes')
    //     .pipe(
    //       map((recipesState) => {
    //         return recipesState.recipes.find((recipe, index) => {
    //           return index === this.id;
    //         });
    //       })
    //     )
    //     .subscribe((recipe) => {
    //       this.recipe = recipe;
    //     });
    // });

    // NGRX second method:
    this.route.params
      .pipe(
        map((params: Params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit' ], { relativeTo: this.route }); //more complex, same result
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
