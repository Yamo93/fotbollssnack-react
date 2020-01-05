import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_USER_INFO
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

// Reducer som uppdaterar autentiseringsrelaterad state i store
export default function (state = initialState, action) {
    switch (action.type) {
        // Uppdaterar state med nuvarande användare
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        // Uppdaterar state med information om användaren
        case SET_USER_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    nickname: action.userInfo.nickname,
                    favoriteclub: action.userInfo.favoriteclub
                }
            };
        // Uppdaterar state med Boolean-värde för att visa spinner
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}