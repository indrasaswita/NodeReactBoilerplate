import {
	API_POST,
	AUTH_LOGIN,
	AUTH_LOGOUT, AUTH_MAPFROMCOOKIE,
	AUTH_REGISTER,
	AUTH_LOADING
} from "./../enums/types";
import sendApi from "./axiosService";


export const login = (data, whendone) => dispatch => {
	if(!whendone
		|| !whendone instanceof Function) {
		console.error("AuthAction ERROR: Need callback function whendone when calling login");
	}

	dispatch(activateLoading());

	sendApi(
		'/auth/login',
		{
			type: API_POST,
			data: data,
			params: null,
		},
		(message, data) => {
			dispatch({
				type: AUTH_LOGIN,
				payload: {
					user: data.user,
					token: data.token,
					ttl: data.ttl,
				}
			});

			whendone();
		}
	);
};

export const logout = (whendone = null) => dispatch => {
	if (whendone == null
		|| !whendone instanceof Function) {
		console.error("AuthAction ERROR: Need callback function whendone when calling logout");
	}
	dispatch(activateLoading());

	sendApi(
		'/auth/logout',
		{
			type: API_POST,
		},
		(message, data) => {
			dispatch({
				type: AUTH_LOGOUT,
			});

			whendone();
		}
	);
};

export const register = (data) => dispatch => {
	dispatch(activateLoading());

	sendApi(
		'/auth/register',
		{
			type: API_POST,
			params: null,
			data: data,
		},
		(message, data) => {
			dispatch({
				type: AUTH_REGISTER,
				payload: {
					user: data.user,
				}
			});
		}
	);
};

export const mapCookieToAuth = (data) => {
	return {
		type: AUTH_MAPFROMCOOKIE,
		payload: {
			user: data.user,
			token: data.token,
		}
	};
};

export const activateLoading = () => {
	return {
		type: AUTH_LOADING,
	}
};
