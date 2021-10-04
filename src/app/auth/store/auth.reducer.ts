import { User } from '../model/user.model';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

export function authReducer(
  state = initialState
  //   action: AuthActions.AuthActions
) {
  //   switch (action.type) {
  //     case AuthActions.SIGNUP:
  //       return {
  //         ...state,
  //         loading: true,
  //       };
  //   }
  return state;
}
