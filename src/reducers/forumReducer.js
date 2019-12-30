import {
    SET_CURRENT_FORUM,
    STORE_FORUM_POSTS,
    SHOW_SPINNER,
    HIDE_SPINNER,
    SET_INTERVAL,
    SHOW_TOAST,
    HIDE_TOAST
} from "../actions/types";

// const isEmpty = require("is-empty");

const initialState = {
    currentForum: '',
    toastMessage: '',
    isToastShowing: false
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
        case SHOW_SPINNER:
            return {
                ...state,
                loading: true
            };
        case HIDE_SPINNER:
            return {
                ...state,
                loading: false
            };
        case SHOW_TOAST:
            return {
                ...state,
                isToastShowing: true,
                toastMessage: action.message
            };
        case HIDE_TOAST:
            return {
                ...state,
                isToastShowing: false
            };
        case SET_INTERVAL:
                const newlyUpdatedState = {
                    ...state
                };
    
                switch (action.forumType) {
                    case 'premierleague':
                        newlyUpdatedState.premierLeagueInterval = action.interval;
                        clearInterval(newlyUpdatedState.serieAInterval);
                        clearInterval(newlyUpdatedState.laLigaInterval);
                        clearInterval(newlyUpdatedState.allsvenskanInterval);
                        return newlyUpdatedState;
                    case 'seriea':
                            newlyUpdatedState.serieAInterval = action.interval;
                            clearInterval(newlyUpdatedState.premierLeagueInterval);
                            clearInterval(newlyUpdatedState.laLigaInterval);
                            clearInterval(newlyUpdatedState.allsvenskanInterval);
                        return newlyUpdatedState;
                    case 'laliga':
                            newlyUpdatedState.laLigaInterval = action.interval;
                            clearInterval(newlyUpdatedState.premierLeagueInterval);
                            clearInterval(newlyUpdatedState.serieAInterval);
                            clearInterval(newlyUpdatedState.allsvenskanInterval);
                        return newlyUpdatedState;
                    case 'allsvenskan':
                            newlyUpdatedState.allsvenskanInterval = action.interval;
                            clearInterval(newlyUpdatedState.premierLeagueInterval);
                            clearInterval(newlyUpdatedState.laLigaInterval);
                            clearInterval(newlyUpdatedState.serieAInterval);
                        return newlyUpdatedState;
                    default:
                        return state;
                }
        default:
            return state;
    }
}