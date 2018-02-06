import React from 'react'; 
import '../styles/App.css';

const Voter = (props) => {
    const { post, handleVote } = props;
    return (
        <div>
            <button className='small-icon like' onClick={() => handleVote(post.title ? 'post' : 'comment', post, 'upVote')}>             
            </button>
            <button disabled className='btn-circle'>
                {post.voteScore}
            </button>
            <button className='small-icon  dislike' onClick={() => handleVote(post.title ? 'post' : 'comment', post, 'downVote')}>
            </button>
        </div >
    )
}

export default Voter;

