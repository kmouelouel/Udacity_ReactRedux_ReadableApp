import React from 'react'; 
import { connect } from 'react-redux';
import { changeCurrentPost, deletePost } from '../actions/posts';
 import OnePost from './OnePost';

 

const PostDetail = (props) => {
    const { post, handleVote, changeCurrentPost, deletePost } = props;
    return (
        <div>
            <OnePost
                onepost={post}
                handleVote={handleVote}
                changeCurrent={changeCurrentPost}
                deletePost={deletePost}
            />
        </div>
    )
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeCurrentPost: (post) => { dispatch(changeCurrentPost(post)) },
    deletePost: (id) => {
            dispatch(deletePost(id))
            && ownProps.history.push(`/${ownProps.post.category}`)
    }
});

export default connect(null, mapDispatchToProps) (PostDetail);
