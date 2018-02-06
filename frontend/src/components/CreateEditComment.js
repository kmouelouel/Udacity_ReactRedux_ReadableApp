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
                    <h3>Comment</h3>
                    <p>Please Add your comment below</p>
                    <table>
                        <tbody>
                                <tr><td>Comment</td><td>
                            {currentComment.id
                                ?  <textarea cols="72" rows="4" ref="comment" placeholder={currentComment.body} /> 
                                : <textarea cols="72" rows="4" ref="comment"/> 
                            }
                               </td></tr>
                                <tr><td>Author</td><td>
                            {currentComment.id
                                ? <input  ref="author" placeholder={currentComment.author} />
                                : <input  ref="author" />
                            }
                                </td></tr> 
                    </tbody>           
                </table> 
                 <button onClick={handleClose}>Cancel</button>
                    {currentComment.id
                        ? <button onClick={() => handleUpdate(currentComment.id, this.refs.comment.value)}>Submit</button>
                        : <button onClick={() => handleAdd(this.refs.comment.value, this.refs.author.value, parentId)}>Submit</button>
                    }
                  
                </Modal>

            </div>
        )
    }
};

const mapStateToProps = ({ comments, username }) => ({
    isOpen: comments.isShowCommentDialog,
    username,
    currentComment: comments.currentComment
});

const mapDispatchToProps = (dispatch) => ({
    handleClose: () => dispatch(showCommentDialog(false)),
    handleAdd: (body, author, parentId) => dispatch(addComment(body, author, parentId)),
    handleUpdate: (body, id) => dispatch(updateComment(body, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditComment);
