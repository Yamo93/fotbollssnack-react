import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
    payload: {
        name: '',
        email: '',
        password: '',
        password2: '',
        nickname: ''
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                payload: action.payload
            };
        case CLEAR_ERRORS: 
        return {
            ...state,
            payload: {
                name: '',
                email: '',
                password: '',
                password2: '',
                nickname: ''
            }
        };
        default:
            return state;
    }
}