
import sendApi from './axiosService';
import {
    API_GET, API_POST, API_DELETE,
    USERS_GET, USERS_ADD, USERS_DELETE, USERS_LOADING,
} from "./../enums/types";


export const getUsers = () => dispatch => {
    dispatch(activateLoading());

    sendApi(
        '/users',
        {
            type: API_GET,
            params: null,
        },
        (message, data) => {
            dispatch({
                type: USERS_GET,
                payload: {
                    users: data.users,
                }
            });
        }
    );
};

export const deleteUser = (id) => dispatch => {
    dispatch(activateLoading());

    sendApi(
        '/users/' + id,
        {
            type: API_DELETE,
            params: null,
        },
        (message, data) => {
            dispatch({
                type: USERS_DELETE,
                payload: {
                    _id: id,
                }
            });
        }
    );
};

export const addUser = (user) => dispatch => {
    dispatch(activateLoading());

    sendApi(
        '/users/register',
        {
            type: API_POST,
            data: user,
            params: null,
        },
        (message, data) => {
            dispatch({
                type: USERS_ADD,
                payload: {
                    user: data.user,
                }
            });
        }
    );
};

export const activateLoading = () => {
    return {
        type: USERS_LOADING,
    };
};