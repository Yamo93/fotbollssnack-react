import axios from "axios";

import {
    SET_CURRENT_FORUM, GET_ERRORS, STORE_FORUM_POSTS
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
}


export const addForumPost = postData => dispatch => {
    axios
        .post('http://localhost:3000/api/posts/', postData)
        .then(res => {
            axios
                .get('http://localhost:3000/api/posts/forums/' + postData.forumType)
                .then(res => dispatch(storeForumPosts(res.data, postData.forumType)))
                .catch(err => dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};


export const fetchForumPosts = forumType => dispatch => {
    console.log('Fetching posts...');
    axios
        .get('http://localhost:3000/api/posts/forums/' + forumType)
        .then(res => dispatch(storeForumPosts(res.data, forumType)))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};