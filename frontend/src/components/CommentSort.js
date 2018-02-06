import React from 'react';
import { connect } from 'react-redux'; 
import { sortComment } from '../actions/comments';
import '../styles/App.css'; 

const CommentSort = (props) => {

    const { commentsNum, sortComment, sortKey, sortOrder } = props;
    return (
        <div className='post-header'>  
            <div className='post-title-header'>
                <button 
                    
                    onClick={() => sortComment('timestamp', sortOrder === 'desc' ? 'asc' : 'desc')}
                >Time</button>
                <button  
                    onClick={() => sortComment('voteScore', sortOrder === 'desc' ? 'asc' : 'desc')}
                >Score</button>
                </div>
           
            <div className='post-option-header nbre-comment'>Number of comments: {commentsNum}</div> 
            <hr/>
        </div>
    )

};

const mapStateToProps = ({ comments }) => ({
    sortKey: comments.sortKey,
    sortOrder: comments.sortOrder
});

const mapDispatchToProps = (dispatch) => ({
    sortComment: (key, order) => dispatch(sortComment(key, order))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentSort);

