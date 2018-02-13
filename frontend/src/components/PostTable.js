import React from 'react';
import { connect } from 'react-redux';  
import { Link } from 'react-router-dom';
import { votePost, changeCurrentPost, deletePost } from '../actions/posts';
import { dateFormat } from '../utils/helper' 
import '../styles/App.css';

const PostTable = (props) => {

    const { posts, changeSortHandler, changeCurrentPost, deletePost, votePost } = props;

    return (
        <div>
            <hr/>
            <div><span>Sort By </span>
                <button onClick={() => changeSortHandler('timestamp')}>Time</button>
            <button onClick={() => changeSortHandler('voteScore')}>Vote Score</button>
              <hr />      
            </div>
            
            {posts.map(post => (
                <div key={post.id}>
                    <div className='post-header'>
                        <h2 className='post-title-header' key={post.id}> <Link  to={`/${post.category}/${post.id}`}>[{post.category}] {post.title}</Link></h2>
                        <div className='post-option-header'>                             
                                <button onClick={() => changeCurrentPost(post)}>Edit</button>
                                <button onClick={() => deletePost(post.id)}>Delete</button>                             
                        </div>
                        </div>
                    <div className='delete-margin'>Posted by <b> {post.author}</b> in <p className='time'> {dateFormat(post.timestamp)}</p> </div>
                    <div className='delete-margin'><p>{post.body}</p></div>
                    <p className='delete-margin'>{post.commentCount} Comment(s)</p>
                    <div>  
                        <button onClick={() => votePost(post, 'upVote')} className='small-icon  like'></button>
                        <button disabled className='btn-circle'>{post.voteScore} </button>
                        <button onClick={() => votePost(post, 'downVote')} className='small-icon  dislike'></button>
                    </div>
                    <hr />
               
                    </div>
                    ))}
                    
            
       </div>

    )
};

const mapDispatchToProps = (dispatch) => ({
    changeCurrentPost: (post) => { dispatch(changeCurrentPost(post)) },
    deletePost: (id) => {
        window.confirm('Do you want to delete this post?') && dispatch(deletePost(id))
    },
    votePost: (post, option) => dispatch(votePost(post, option)),
});

export default connect(null, mapDispatchToProps)(PostTable);

