/** component show one post or comment */
import React from 'react'; 
import Voter from './Voter';
import { dateFormat } from '../utils/helper';
import '../styles/App.css';

 

const OnePost = (props) => {

    const { onepost, handleVote, changeCurrent, deletePost } = props;

    return (
        <div key={onepost.id}> 
                <div className='post-header'>
                <h2 className='post-title-header' key={onepost.id}>{onepost.body}</h2>
                    <div className='post-option-header'>
                    <button onClick={() => changeCurrent(onepost)}> Edit </button> 
                    <button onClick={() => deletePost(onepost.id)}> Delete</button> 
                    </div>
                </div> 
                <div className='delete-margin'>Commented by <b>{onepost.author}</b> @ <p className='time'> {dateFormat(onepost.timestamp)} </p></div>
                <div>
                <Voter post={onepost} handleVote={handleVote} />
                </div>              
            <hr/>
            </div>
            
    )

};

export default OnePost