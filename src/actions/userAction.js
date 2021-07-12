
import axios from 'axios';
import { GET_USERS, ADD_USERS, DELETE_USERS, USERS_LOADING } from "./types";


export const getUsers = () => dispatch => {
    dispatch(setUsersLoading());

    axios
        .get('http://localhost:8000/api/user')
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data.data,
            })
        );
};

export const deleteUser = (id) => dispatch => {
    dispatch(setUsersLoading());

    axios
        .delete('http://localhost:8000/api/user/' + id)
        .then(res =>
            dispatch({
                type: DELETE_USERS,
                payload: id
            })
        );
};

export const addUser = (user) => dispatch => {
    dispatch(setUsersLoading());

    axios
        .post('http://localhost:8000/api/user/register', user)
        .then(res =>
            dispatch({
                type: ADD_USERS,
                payload: res.data.data,
            })
        );
};

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING,
    };
};