import React from 'react'; 
import { connect } from 'react-redux';
import { showCommentDialog } from '../actions/comments';
import { showPostDialog } from '../actions/posts';
import { fetchCategory } from '../actions/categories';

 
const AddBtn = (props) => {

    const {isPost, isComment, showCommentDialog, showPostDialog } = props;

    return (

        <div>
            {isPost &&
                <button  title="Add Post" onClick={() => showPostDialog()}>
                   Add Post
            </button>
            }
            {isComment &&
                <button  title="Add Comment" onClick={() => showCommentDialog()}>
                   Add Comment
            </button>
               
            }
            <hr />
        </div >

    )

};

const mapDispatchToProps = (dispatch) => ({
    showCommentDialog: () => dispatch(showCommentDialog(true)),
    showPostDialog: () => { dispatch(fetchCategory()); dispatch(showPostDialog(true)) },
});

export default connect(null, mapDispatchToProps)(AddBtn);

