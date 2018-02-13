import * as API from '../utils/api';
import {
    RECEIVE_COMMENTS,
    SORT_COMMENT,
    CHANGE_SORT_KEY,
    CHANGE_SORT_ORDER,
    VOTE_COMMENT,
    IS_SHOW_COMMENT_DIALOG,
    ADD_COMMENT,
    CHANGE_CURRENT_COMMENT,
    UPDATE_COMMENT, DELETE_COMMENT
} from './constants'

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const fetchComments = (post_id) => (dispatch, getState) => {
    API.getComments(post_id).then(comments => {
        dispatch(receiveComments(comments));
        return dispatch(sortComment(getState().comments.sortKey, getState().comments.sortOrder));
    });
}

export const sortComment = (key, order) => (dispatch) => {
    dispatch(changeSortKey(key));
    dispatch(changeSortOrder(order));
    dispatch({
        type: SORT_COMMENT,
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

export const voteComment = (comment, option) => (dispatch) =>
    API.voteComment(comment.id, option).then(newComment => (
        comment.voteScore !== newComment.voteScore && dispatch({
            type: VOTE_COMMENT,
            id: comment.id,
            option
        })
    ));

export const showCommentDialog = (isShow) => (dispatch) => {
    !isShow && dispatch(changeCurrentComment({}));
    dispatch({
        type: IS_SHOW_COMMENT_DIALOG,
        isShow
    });
};

export const addComment = (body, author, parentId) => (dispatch) => (
    API.addComment(body, author, parentId).then(comment => {
        dispatch({
            type: ADD_COMMENT,
            comment
        });
        dispatch(showCommentDialog(false));
    })
);

export const updateComment = (id, body,author) => (dispatch) => {
    const timestamp = (new Date()).getTime();
    API.updateComment(id, body, timestamp).then(comment => {
        dispatch({
            type: UPDATE_COMMENT,
            id,
            body: comment.body,
            author: author,
            timestamp: comment.timestamp
        });
        dispatch(showCommentDialog(false));
    })
};

export const changeCurrentComment = (comment) => (dispatch) => {
    dispatch({
        type: CHANGE_CURRENT_COMMENT,
        comment
    });
    dispatch(showCommentDialog(true));
};

export const deleteComment = (id) => (dispatch) =>
    API.deleteComment(id).then(comment =>
        comment.deleted && dispatch({
            type: DELETE_COMMENT,
            id: comment.id
        })
    );
