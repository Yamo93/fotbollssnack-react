import {
    SET_CURRENT_FORUM,
    STORE_FORUM_POSTS,
    SHOW_SPINNER,
    HIDE_SPINNER,
    SET_INTERVAL,
    SHOW_TOAST,
    HIDE_TOAST,
    PAGINATE_POSTS,
    SET_CURRENT_FORUM_PAGE
} from "../actions/types";

const initialState = {
    currentForum: '',
    toastMessage: '',
    toastColorClass: '',
    isToastShowing: false,
    numberOfSerieAPages: 0,
    paginatedSerieAPosts: {},
    currentSerieAForumPage: 1,
    serieAPosts: []
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

            const postsPerPage = 5;

            switch (action.forumType) {
                case 'premierleague':
                    updatedState.premierLeaguePosts = action.posts;
                    break;
                case 'seriea':
                    updatedState.serieAPosts = action.posts;

                    // Pagination
                    // Räknar ut antalet sidor och avrundar uppåt
                    const pages = Math.ceil(action.posts.length / postsPerPage);

                    // Klonar arrayen
                    const copiedPages = [...action.posts];

                    // Sparar antal sidor för forumet
                    updatedState.numberOfSerieAPages = pages;

                    // Skapar ett objekt med sidonummer som nycklar
                    const paginatedPosts = {};

                    // Skapar en array med sidonummer
                    // const arrayWithPageNumbers = Array.from(Array(pages).keys());
                    const arrayWithPageNumbers = [];
                    for (let i = 1; i <= pages; i++) {
                        arrayWithPageNumbers.push(i);
                    }

                    updatedState.serieAPostPages = arrayWithPageNumbers;

                    // Fyller värdena med posts för den specifika sidan
                    for (const page of arrayWithPageNumbers) {
                        paginatedPosts[page] = [];
                        for (let i = 0; i < postsPerPage; i++) {
                            paginatedPosts[page].push(copiedPages.shift());
                        }
                    }

                    updatedState.paginatedSerieAPosts = paginatedPosts;

                    // Visar första sidan
                    updatedState.serieAPaginatedPostsToShow = updatedState.paginatedSerieAPosts[1];
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
        case PAGINATE_POSTS:
            const stateWithPagination = {
                ...state
            };
            // const postsPerPage = 5;

            switch (action.forumType) {
                case 'premierleague':
                    break;
                case 'seriea':
                    // Räknar ut antalet sidor
                    const pages = stateWithPagination.serieAPosts.length / postsPerPage;

                    // Klonar arrayen
                    const copiedPages = [...stateWithPagination.serieAPosts];

                    // Sparar antal sidor för forumet
                    stateWithPagination.numberOfSerieAPages = pages;

                    // Skapar ett objekt med sidonummer som nycklar
                    const paginatedPosts = {};

                    // Skapar en array med sidonummer
                    const arrayWithPageNumbers = Array.from(Array(pages).keys());
                    const postPages = [];
                    arrayWithPageNumbers.forEach(arrayPageNumber => postPages.push(arrayPageNumber + 1));
                    // Sparar arrayen i state
                    stateWithPagination.serieAPostPages = postPages;

                    // Fyller värdena med posts för den specifika sidan
                    for (const page of postPages) {
                        paginatedPosts[page] = [];
                        for (let i = 0; i < postsPerPage; i++) {
                            paginatedPosts[page].push(copiedPages.shift());
                        }
                    }

                    stateWithPagination.paginatedSerieAPosts = paginatedPosts;
                    break;
                case 'laliga':
                    break;
                case 'allsvenskan':
                    break;
                default:
                    break;
            }
            return stateWithPagination;
        case SET_CURRENT_FORUM_PAGE:
            const stateWithCurrentForumPage = { ...state };

            switch (action.forumType) {
                case 'premierleague':
                    stateWithCurrentForumPage.currentPremierLeagueForumPage = action.forumPageId;
                    break;
                case 'seriea':
                    stateWithCurrentForumPage.currentSerieAForumPage = action.forumPageId;
                    stateWithCurrentForumPage.serieAPaginatedPostsToShow = stateWithCurrentForumPage.paginatedSerieAPosts[action.forumPageId];
                    break;
                case 'laliga':
                    stateWithCurrentForumPage.currentLaLigaForumPage = action.forumPageId;
                    break;
                case 'allsvenskan':
                    stateWithCurrentForumPage.currentAllsvenskanForumPage = action.forumPageId;
                    break;
                default:
                    break;
            }

            return stateWithCurrentForumPage;
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
                toastColorClass: action.colorClass,
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