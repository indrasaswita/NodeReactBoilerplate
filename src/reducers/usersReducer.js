

import {
    USERS_GET,
    USERS_ADD,
    USERS_DELETE,
    USERS_LOADING
} from "./../enums/types";

const initialState = {
    users: [],
    loading: false,
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case USERS_GET:
            return {
                ...state,
                users: action.payload.users,
                loading: false,
            };
        case USERS_DELETE:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload._id),
                loading: false,
            };

        case USERS_ADD:
            return {
                ...state,
                users: [action.payload.users, ...state.users],
                loading: false,
            };

        case USERS_LOADING:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};


export default usersReducer;