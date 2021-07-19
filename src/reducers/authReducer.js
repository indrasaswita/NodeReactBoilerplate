import {
	AUTH_LOGIN,
	AUTH_LOGOUT,
	AUTH_MAPFROMCOOKIE,
	AUTH_REGISTER,
	AUTH_LOADING
} from './../enums/types';
import Cookies from 'universal-cookie';

const initialState = {
	loading: false,
	user: null,
	token: null,
};
const cookies = new Cookies();

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_LOGIN:
			cookies.set('auth_token', action.payload.token, { path: '/', maxAge: action.payload.ttl });
			cookies.set('auth_user', action.payload.user, { path: '/', maxAge: action.payload.ttl });

			console.log(cookies.get('auth_token'));
			return {
				...state,
				user: action.payload.user,
                token: action.payload.token,
				loading: false,
			};
		case AUTH_REGISTER:
			return {
				...state,
				user: null,
                token: null,
				loading: false,
			};
        case AUTH_LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                loading: false,
            };
		case AUTH_MAPFROMCOOKIE:
			return {
				...state,
				user: action.payload.user,
				token:action.payload.token,
			};
		case AUTH_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}

}


export default authReducer;
