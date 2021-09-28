import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', '5'),
    new Ingredient('Tomatoes', '10'),
  ],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      // Old ingredient
      const ingredient = state.ingredients[action.payload.index];
      //   New Ingredient
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };
      //   New Ingredients List clone to not mutate state directly
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      //   Return the state with the updated cloned ingredients list
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ing, index) => index !== action.payload
        ),
      };
    default:
      return state;
  }
}
