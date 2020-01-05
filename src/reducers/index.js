import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import forumReducer from './forumReducer';

// Kombinerar reducers
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    forum: forumReducer
});