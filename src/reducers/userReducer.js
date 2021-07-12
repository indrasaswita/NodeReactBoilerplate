import { GET_USERS, ADD_USERS, DELETE_USERS, USERS_LOADING } from "../actions/types";

const initialState = {
    users: [],
    loading: false,
};

const userReducer = (state = initialState, action) => {
    console.log(state);
    console.log({
        ...state,
    });
    switch(action.type) {
        case GET_USERS:
            console.log(action.payload);

            return {
                ...state,
                users: action.payload,
                loading: false,
            };

        case DELETE_USERS:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
                loading: false,
            };

        case ADD_USERS:
            return {
                ...state,
                users: [action.payload, ...state.users],
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


export default userReducer;