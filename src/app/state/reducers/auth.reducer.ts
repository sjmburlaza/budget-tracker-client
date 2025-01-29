import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "src/app/state/actions/login.actions";
import { User } from "src/app/shared/models/user.model";

export interface AuthState {
	user: User | null;
	token: string | null;
	loading: boolean;
	error: string | null;
}

export const initialState: AuthState = {
	user: JSON.parse(localStorage.getItem('user') || 'null'),
	token: localStorage.getItem('token') || null,
	loading: false,
	error: null
}

export const authReducer = createReducer(
	initialState,
	on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
	on(AuthActions.loginSuccess, (state, { user, token }) => {
		// console.log('User updated in store:', user);
		// console.log('Token updated in store:', token);
		return {
			...state,
			user,
			token,
			loading: false,
			error: null,
		};
	}),
	on(AuthActions.logout, () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }))
)