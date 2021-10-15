import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //   ingredients: Ingredient[];
  // NGRX
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChangeSub: Subscription;

  constructor(
    // private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    //   NGRX
    this.ingredients = this.store.select('shoppingList');

    // WITHOUT NGRX
    // this.ingredients = this.slService.getIngredients();
    // this.igChangeSub = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy() {
    // this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(ShoppingListActions.startEdit({ index: index }));
  }
}
