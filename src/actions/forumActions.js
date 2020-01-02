import axios from "axios";

import {
    SET_CURRENT_FORUM, GET_ERRORS, STORE_FORUM_POSTS, SHOW_SPINNER, HIDE_SPINNER, SET_INTERVAL, SHOW_TOAST, HIDE_TOAST, PAGINATE_POSTS, SET_CURRENT_FORUM_PAGE
} from './types';

// Set logged in user
export const setCurrentForum = forumType => {
    return {
        type: SET_CURRENT_FORUM,
        payload: forumType
    };
};

export const storeForumPosts = (posts, forumType) => {
    return {
        type: STORE_FORUM_POSTS,
        forumType,
        posts
    };
};

export const paginatePosts = forumType => {
    return {
        type: PAGINATE_POSTS,
        forumType
    };
};

export const setCurrentForumPage = (forumPageId, forumType) => {
    return {
        type: SET_CURRENT_FORUM_PAGE,
        forumPageId,
        forumType
    };
};

export const showSpinner = () => {
    return {
        type: SHOW_SPINNER
    };
};

export const hideSpinner = () => {
    return {
        type: HIDE_SPINNER
    };
};

export const showToast = (message, colorClass) => {
    return {
        type: SHOW_TOAST,
        message,
        colorClass
        // toastType
    };
};

export const hideToast = message => {
    return {
        type: HIDE_TOAST,
        message
    };
};


export const setForumInterval = (forumType, interval) => {
    return {
        type: SET_INTERVAL,
        forumType,
        interval
    };
};

export const addForumPost = postData => dispatch => {
    dispatch(showSpinner());
    axios
        .post('http://localhost:3000/api/posts/', postData)
        .then(res => {
            dispatch(hideSpinner());
            dispatch(showSpinner());
            dispatch(showToast("Inlägget har lagts till.", 'text-success'));
            axios
                .get('http://localhost:3000/api/posts/forums/' + postData.forumType)
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

export const updateForumPost = postData => dispatch => {
    axios
        .put('http://localhost:3000/api/posts/' + postData.id, postData)
        .then(res => {
            dispatch(showSpinner());
            axios
                .get('http://localhost:3000/api/posts/forums/' + postData.forumType)
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

export const deleteForumPost = postData => dispatch => {
    axios
        .delete('http://localhost:3000/api/posts/' + postData.id)
        .then(res => {
            dispatch(showSpinner());
            axios
                .get('http://localhost:3000/api/posts/forums/' + postData.forumType)
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


export const fetchForumPosts = forumType => dispatch => {
    dispatch(showSpinner());
    console.log('Fetching posts for forum of type ', forumType);
    axios
        .get('http://localhost:3000/api/posts/forums/' + forumType)
        .then(res => {
            console.log('Fetch successful..');
            dispatch(hideSpinner());
            dispatch(storeForumPosts(res.data, forumType));
            // dispatch(paginatePosts(forumType));
        })
        .catch(err => {
            dispatch(hideSpinner());
            console.log('Failed to fetch.');
            dispatch({
                type: GET_ERRORS
            })
        });
};

