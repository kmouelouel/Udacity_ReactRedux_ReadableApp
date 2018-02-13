import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import Modal from 'react-modal';
import { showCommentDialog, addComment, updateComment } from '../actions/comments';

class CreateEditComment extends Component {
   
    
   
    render() {
        const { handleClose, handleAdd, handleUpdate,isOpen, parentId, currentComment } = this.props;
        
        return (
            
            <div>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={isOpen}
                    onRequestClose={handleClose}
                    contentLabel='Modal'
                    ariaHideApp={false}
                >
                    <h3>{currentComment.id ? "Edit" : "New"} Comment</h3>
                    <p>Please Add your comment below</p>
                    <form>
                        <label>Comment
                             {currentComment.id
                                ? <textarea cols="72" rows="4" ref='comment' defaultValue={currentComment.body }  />
                                : <textarea cols="72" rows="4" ref='comment' placeholder='Please, enter your comment'/>
                            }
                         </label> 
                        <label>Author
                                {currentComment.id
                                ? <span> : {currentComment.author} </span>
                                : <input type='text' ref='author'  placeholder='Please, Enter your name'   />
                            }
                        </label>
                        <br /><br />
                     <button onClick={handleClose}>Cancel</button>
                    {currentComment.id
                            ? <button onClick={() => handleUpdate(this.refs.comment.value, currentComment.id)}>Submit</button>
                            : <button onClick={() => handleAdd(this.refs.comment.value, this.refs.author.value, parentId)}>Submit</button>
                    }             
                  </form>
               
                  
                </Modal>

            </div>
        )
    }
};

const mapStateToProps = ({ comments }) => ({
    isOpen: comments.isShowCommentDialog,
    currentComment: comments.currentComment
});

const mapDispatchToProps = (dispatch) => ({
    handleClose: () => dispatch(showCommentDialog(false)),
    handleAdd: (body, author, parentId) => dispatch(addComment(body, author, parentId)),
    handleUpdate: (body, id) => dispatch(updateComment(id,body))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditComment);
