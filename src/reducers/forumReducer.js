import {
    SET_CURRENT_FORUM,
    STORE_FORUM_POSTS
} from "../actions/types";

// const isEmpty = require("is-empty");

const initialState = {
    currentForum: ''
};
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_FORUM:
            return {
                ...state,
                currentForum: action.payload
            };
        case STORE_FORUM_POSTS:
            const updatedState = {
                ...state
            };

            switch (action.forumType) {
                case 'premierleague':
                    updatedState.premierLeaguePosts = action.posts;
                    break;
                case 'seriea':
                    updatedState.serieAPosts = action.posts;
                    break;
                case 'laliga':
                    updatedState.laLigaPosts = action.posts;
                    break;
                case 'allsvenskan':
                    updatedState.allsvenskanPosts = action.posts;
                    break;
                default:
                    break;
            }
            return updatedState;
        default:
            return state;
    }
}