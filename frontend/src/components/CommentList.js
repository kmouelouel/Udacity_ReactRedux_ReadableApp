import React from 'react'; 
import CommentSort from './CommentSort';
import { connect } from 'react-redux';
import { changeCurrentComment, deleteComment } from '../actions/comments';
import OnePost from './OnePost';

 

const CommentList = (props) => {
    const {  comments, handleVote, changeCurrentComment, deleteComment } = props;
    
    return (
        <div>
            <CommentSort commentsNum={comments.length} />
            <div>
                {comments.map(comment => (
                    <OnePost
                        key={comment.id}
                        onepost={comment}
                        handleVote={handleVote}
                        changeCurrent={changeCurrentComment}
                        deletePost={deleteComment}
                    />
                ))}
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    changeCurrentComment: (comment) => dispatch(changeCurrentComment(comment)),
    deleteComment: (id) => {
        window.confirm('Do you want to delete this comment ?')
            && dispatch(deleteComment(id))
    }
});

export default connect(null, mapDispatchToProps)(CommentList);
