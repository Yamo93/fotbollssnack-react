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
    serieAPosts: [],
    numberOfPremierLeaguePages: 0,
    paginatedPremierLeaguePosts: {},
    currentPremierLeagueForumPage: 1,
    premierLeaguePosts: [],
    numberOfLaLigaPages: 0,
    paginatedLaLigaPosts: {},
    currentLaLigaForumPage: 1,
    laLigaPosts: [],
    numberOfAllsvenskanPages: 0,
    paginatedAllsvenskanPosts: {},
    currentAllsvenskanForumPage: 1,
    allsvenskanPosts: [],
};
export default function (state = initialState, action) {
    switch (action.type) {
        // Väljer nuvarande forum
        case SET_CURRENT_FORUM:
            return {
                ...state,
                currentForum: action.payload
            };
        // Sparar foruminlägg i store (med paginering)
        case STORE_FORUM_POSTS:
            const updatedState = {
                ...state
            };

            const postsPerPage = 5;

            switch (action.forumType) {
                case 'premierleague':
                    updatedState.premierLeaguePosts = action.posts;

                    // Paginering
                    //Räknar ut antalet sidor och avrundar uppåt, och sparar antal sidor för forumet
                    updatedState.numberOfPremierLeaguePages = Math.ceil(action.posts.length / postsPerPage);

                    // Klonar arrayen
                    const copiedPremierLeaguePages = [...action.posts];

                    // Skapar ett objekt med sidonummer som nycklar
                    const paginatedPremierLeaguePosts = {};

                    // Skapar en array med sidonummer
                    const arrayWithPremierLeaguePageNumbers = [];
                    for (let i = 1; i <= updatedState.numberOfPremierLeaguePages; i++) {
                        arrayWithPremierLeaguePageNumbers.push(i);
                    }

                    updatedState.premierLeaguePostPages = arrayWithPremierLeaguePageNumbers;

                    // Fyller värdena med posts för den specifika sidan
                    for (const page of arrayWithPremierLeaguePageNumbers) {
                        paginatedPremierLeaguePosts[page] = [];
                        for (let i = 0; i < postsPerPage; i++) {
                            paginatedPremierLeaguePosts[page].push(copiedPremierLeaguePages.shift());
                        }
                    }

                    updatedState.paginatedPremierLeaguePosts = paginatedPremierLeaguePosts;

                    // Visar nuvarande sidan
                    updatedState.premierLeaguePaginatedPostsToShow = updatedState.paginatedPremierLeaguePosts[updatedState.currentPremierLeagueForumPage];
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

                    // Visar nuvarande sidan
                    updatedState.serieAPaginatedPostsToShow = updatedState.paginatedSerieAPosts[updatedState.currentSerieAForumPage];
                    break;
                case 'laliga':
                    updatedState.laLigaPosts = action.posts;

                    // Pagination
                    //Räknar ut antalet sidor och avrundar uppåt, och sparar antal sidor för forumet
                    updatedState.numberOfLaLigaPages = Math.ceil(action.posts.length / postsPerPage);

                    // Klonar arrayen
                    const copiedLaLigaPages = [...action.posts];

                    // Skapar ett objekt med sidonummer som nycklar
                    const paginatedLaLigaPosts = {};

                    // Skapar en array med sidonummer
                    const arrayWithLaLigaPageNumbers = [];
                    for (let i = 1; i <= updatedState.numberOfLaLigaPages; i++) {
                        arrayWithLaLigaPageNumbers.push(i);
                    }

                    updatedState.laLigaPostPages = arrayWithLaLigaPageNumbers;

                    // Fyller värdena med posts för den specifika sidan
                    for (const page of arrayWithLaLigaPageNumbers) {
                        paginatedLaLigaPosts[page] = [];
                        for (let i = 0; i < postsPerPage; i++) {
                            paginatedLaLigaPosts[page].push(copiedLaLigaPages.shift());
                        }
                    }

                    updatedState.paginatedLaLigaPosts = paginatedLaLigaPosts;

                    // Visar första sidan
                    updatedState.laLigaPaginatedPostsToShow = updatedState.paginatedLaLigaPosts[updatedState.currentLaLigaForumPage];
                    break;
                case 'allsvenskan':
                    updatedState.allsvenskanPosts = action.posts;

                    // Pagination
                    //Räknar ut antalet sidor och avrundar uppåt, och sparar antal sidor för forumet
                    updatedState.numberOfAllsvenskanPages = Math.ceil(action.posts.length / postsPerPage);

                    // Klonar arrayen
                    const copiedAllsvenskanPages = [...action.posts];

                    // Skapar ett objekt med sidonummer som nycklar
                    const paginatedAllsvenskanPosts = {};

                    // Skapar en array med sidonummer
                    const arrayWithAllsvenskanPageNumbers = [];
                    for (let i = 1; i <= updatedState.numberOfAllsvenskanPages; i++) {
                        arrayWithAllsvenskanPageNumbers.push(i);
                    }

                    updatedState.allsvenskanPostPages = arrayWithAllsvenskanPageNumbers;

                    // Fyller värdena med posts för den specifika sidan
                    for (const page of arrayWithAllsvenskanPageNumbers) {
                        paginatedAllsvenskanPosts[page] = [];
                        for (let i = 0; i < postsPerPage; i++) {
                            paginatedAllsvenskanPosts[page].push(copiedAllsvenskanPages.shift());
                        }
                    }

                    updatedState.paginatedAllsvenskanPosts = paginatedAllsvenskanPosts;

                    // Visar nuvarande sidan
                    updatedState.allsvenskanPaginatedPostsToShow = updatedState.paginatedAllsvenskanPosts[updatedState.currentAllsvenskanForumPage];
                    break;
                default:
                    break;
            }
            return updatedState;
        // Väljer nuvarande forumsida
        case SET_CURRENT_FORUM_PAGE:
            const stateWithCurrentForumPage = { ...state };

            switch (action.forumType) {
                case 'premierleague':
                    stateWithCurrentForumPage.currentPremierLeagueForumPage = action.forumPageId;
                    stateWithCurrentForumPage.premierLeaguePaginatedPostsToShow = stateWithCurrentForumPage.paginatedPremierLeaguePosts[action.forumPageId];
                    break;
                case 'seriea':
                    stateWithCurrentForumPage.currentSerieAForumPage = action.forumPageId;
                    stateWithCurrentForumPage.serieAPaginatedPostsToShow = stateWithCurrentForumPage.paginatedSerieAPosts[action.forumPageId];
                    break;
                case 'laliga':
                    stateWithCurrentForumPage.currentLaLigaForumPage = action.forumPageId;
                    stateWithCurrentForumPage.laLigaPaginatedPostsToShow = stateWithCurrentForumPage.paginatedLaLigaPosts[action.forumPageId];
                    break;
                case 'allsvenskan':
                    stateWithCurrentForumPage.currentAllsvenskanForumPage = action.forumPageId;
                    stateWithCurrentForumPage.allsvenskanPaginatedPostsToShow = stateWithCurrentForumPage.paginatedAllsvenskanPosts[action.forumPageId];
                    break;
                default:
                    break;
            }

            return stateWithCurrentForumPage;
        // Visar spinner
        case SHOW_SPINNER:
            return {
                ...state,
                loading: true
            };
        // Döljer spinner
        case HIDE_SPINNER:
            return {
                ...state,
                loading: false
            };
        // Visar toast
        case SHOW_TOAST:
            return {
                ...state,
                isToastShowing: true,
                toastColorClass: action.colorClass,
                toastMessage: action.message
            };
        // Döljer toast
        case HIDE_TOAST:
            return {
                ...state,
                isToastShowing: false
            };
        // Sätter tidsintervall för forumuppdatering
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