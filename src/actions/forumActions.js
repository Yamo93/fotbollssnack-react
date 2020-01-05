import axios from "axios";

import {
    SET_CURRENT_FORUM, GET_ERRORS, STORE_FORUM_POSTS, SHOW_SPINNER, HIDE_SPINNER, SET_INTERVAL, SHOW_TOAST, HIDE_TOAST, PAGINATE_POSTS, SET_CURRENT_FORUM_PAGE
} from './types';

// Väljer nuvarande forum
export const setCurrentForum = forumType => {
    return {
        type: SET_CURRENT_FORUM,
        payload: forumType
    };
};

// Sparar senaste inläggen i store
export const storeForumPosts = (posts, forumType) => {
    return {
        type: STORE_FORUM_POSTS,
        forumType,
        posts
    };
};

// Paginering för inläggen
export const paginatePosts = forumType => {
    return {
        type: PAGINATE_POSTS,
        forumType
    };
};

// Väljer nuvarande sida på forumet
export const setCurrentForumPage = (forumPageId, forumType) => {
    return {
        type: SET_CURRENT_FORUM_PAGE,
        forumPageId,
        forumType
    };
};

// Visar spinner
export const showSpinner = () => {
    return {
        type: SHOW_SPINNER
    };
};

// Döljer spinner
export const hideSpinner = () => {
    return {
        type: HIDE_SPINNER
    };
};

// Visar toast
export const showToast = (message, colorClass) => {
    return {
        type: SHOW_TOAST,
        message,
        colorClass
    };
};

// Gömmer toast
export const hideToast = message => {
    return {
        type: HIDE_TOAST,
        message
    };
};

// Sätter tidsintervall för uppdatering av foruminlägg
export const setForumInterval = (forumType, interval) => {
    return {
        type: SET_INTERVAL,
        forumType,
        interval
    };
};

// Skapar nytt inlägg
export const addForumPost = postData => dispatch => {
    dispatch(showSpinner());
    axios
        .post('https://murmuring-citadel-51726.herokuapp.com/api/posts/', postData)
        .then(res => {
            dispatch(hideSpinner());
            dispatch(showSpinner());
            dispatch(showToast("Inlägget har lagts till.", 'text-success'));
            axios
                .get('https://murmuring-citadel-51726.herokuapp.com/api/posts/forums/' + postData.forumType)
                .then(res => {
                    dispatch(hideSpinner());
                    dispatch(storeForumPosts(res.data, postData.forumType));
                })
                .catch(err => {
                    dispatch(hideSpinner());
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                });
        })
        .catch(err => {
            dispatch(hideSpinner());
            dispatch(showToast("Inlägget har ej lagts till.", 'text-danger'));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// Uppdaterar foruminlägg
export const updateForumPost = postData => dispatch => {
    axios
        .put('https://murmuring-citadel-51726.herokuapp.com/api/posts/' + postData.id, postData)
        .then(res => {
            dispatch(showSpinner());
            axios
                .get('https://murmuring-citadel-51726.herokuapp.com/api/posts/forums/' + postData.forumType)
                .then(res => {
                    dispatch(showToast("Inlägget har redigerats.", 'text-success'));
                    dispatch(hideSpinner());
                    dispatch(storeForumPosts(res.data, postData.forumType));
                })
                .catch(err => {
                    dispatch(hideSpinner());
                    dispatch(showToast("Något gick fel vid omladdningen av inlägg.", 'text-danger'));
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    });
                });
        })
        .catch(err => {
            dispatch(hideSpinner());
            dispatch(showToast("Inlägget har ej uppdaterats.", 'text-danger'));
            dispatch(showToast(err.response.data));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// Raderar foruminlägg
export const deleteForumPost = postData => dispatch => {
    axios
        .delete('https://murmuring-citadel-51726.herokuapp.com/api/posts/' + postData.id)
        .then(res => {
            dispatch(showSpinner());
            axios
                .get('https://murmuring-citadel-51726.herokuapp.com/api/posts/forums/' + postData.forumType)
                .then(res => {
                    dispatch(showToast("Inlägget har raderats.", 'text-success'));
                    dispatch(hideSpinner());
                    dispatch(storeForumPosts(res.data, postData.forumType));
                })
                .catch(err => {
                    dispatch(showToast("Något gick fel vid omladdningen av inlägg.", 'text-danger'));
                    dispatch(hideSpinner());
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                });
        })
        .catch(err => {
            dispatch(hideSpinner());
            dispatch(showToast("Inlägget har ej raderats.", 'text-danger'));
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

// Hämtar senaste foruminläggen
export const fetchForumPosts = forumType => dispatch => {
    dispatch(showSpinner());
    axios
        .get('https://murmuring-citadel-51726.herokuapp.com/api/posts/forums/' + forumType)
        .then(res => {
            dispatch(hideSpinner());
            dispatch(storeForumPosts(res.data, forumType));
        })
        .catch(err => {
            dispatch(hideSpinner());
            dispatch({
                type: GET_ERRORS
            })
        });
};

