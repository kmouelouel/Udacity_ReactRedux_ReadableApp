import * as API from '../utils/api';
import {
    ADD_POST,
    UPDATE_POST,
    VOTE_POST,
    DELETE_POST,
    RECEIVE_POSTS,
    SORT_POST,
    CHANGE_SORT_KEY,
    CHANGE_SORT_ORDER,
    IS_SHOW_POST_DIALOG,
    CHANGE_CURRENT_POST
} from './constants'

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

export const fetchPosts = () => (dispatch, getState) => {
    API.getPosts().then(posts => {
        dispatch(receivePosts(posts));
        dispatch(sortPost(getState().posts.sortKey, getState().posts.sortOrder));
    });
}

export const fetchCatPosts = (cat) => (dispatch, getState) => {
    API.getCPosts(cat).then(posts => {
        dispatch(receivePosts(posts));
        dispatch(sortPost(getState().posts.sortKey, getState().posts.sortOrder));
    });
}

export const fetchOnePost = (id) => (dispatch) => {
    API.getPost(id).then(post => {
        post.error ? dispatch(receivePosts([{ id: '' }])) : dispatch(receivePosts([post]));
    })
}

export const addPost = (title, body, author, category) => (dispatch) => {
    API.addPost(title, body, author, category).then(post => {
        dispatch({
            type: ADD_POST,
            post
        });
        dispatch(showPostDialog(false));
    });
};

export const updatePost = (id, title, body) => (dispatch) => (
    API.updatePost(id, title, body).then(post => {
        dispatch({
            type: UPDATE_POST,
            id,
            title: post.title,
            body: post.body
        });
        dispatch(showPostDialog(false));
    })
);

export const votePost = (post, option) => (dispatch) =>
    API.votePost(post.id, option).then((newPost) => (
        post.voteScore !== newPost.voteScore && dispatch({
            type: VOTE_POST,
            id: post.id,
            option
        })
    ))

export const deletePost = (id) => (dispatch) =>
    API.deletePost(id).then(post =>
        post.deleted && dispatch({
            type: DELETE_POST,
            id
        })
    );

export const sortPost = (key, order) => (dispatch) => {
    dispatch(changeSortKey(key));
    dispatch(changeSortOrder(order));
    dispatch({
        type: SORT_POST,
        key,
        order
    });
};

export const changeSortKey = (key) => ({
    type: CHANGE_SORT_KEY,
    key
});

export const changeSortOrder = (order) => ({
    type: CHANGE_SORT_ORDER,
    order
});

export const showPostDialog = (isShow) => (dispatch) => {
    !isShow && dispatch(changeCurrentPost({}));
    dispatch({
        type: IS_SHOW_POST_DIALOG,
        isShow
    });
};

export const changeCurrentPost = (post) => (dispatch) => {
    dispatch({
        type: CHANGE_CURRENT_POST,
        post
    });
    dispatch(showPostDialog(true));
};

