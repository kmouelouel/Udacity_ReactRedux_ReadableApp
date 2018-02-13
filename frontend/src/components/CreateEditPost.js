import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { showPostDialog, addPost, updatePost } from '../actions/posts';
import Modal from 'react-modal'
 
class CreateEditPost extends Component {
    
    render() {

        const { handleClose, handleAdd, handleUpdate, isOpen, categories,currentPost} = this.props;

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
                    <h3>  {currentPost.id ? "Edit " : "New "} Post</h3>
                   <form>
                             <label>Category :   
                            {currentPost.id
                                ? null
                                :
                                        <select ref="category">
                                       {categories.map(c => (
                                        <option key={c.name} value={c.name}>{c.name}</option>
                                        ))}
                                        </select>
                          
                                 }   </label>
                             <br />
                             <label> Title 
                            {currentPost.id
                                ?<input type="text" ref="title" defaultValue={currentPost.title} /> 
                                    : <input type="text" ref="title" placeholder='Please, Enter the title'/>
                            }
                             </label> 
                            <label> Content 
                            {currentPost.id
                                ?<textarea cols="72" rows="4" ref="body"  defaultValue={currentPost.body} /> 
                                    : <textarea cols="72" rows="4" ref="body" placeholder='Add your comment here' />
                            }
                            </label> 
                            <label> Author
                                {currentPost.id
                                    ? <span>: {currentPost.author} </span>
                                    : <input type="text" ref="author" placeholder='Please, enter your name' />
                                }
                            </label> 
                            <br /> <br />
                            <button onClick={handleClose}>Cancel</button>
                            {currentPost.id
                                ? <button onClick={() => handleUpdate(currentPost.id, this.refs.title.value, this.refs.body.value)}>Submit</button>
                                : <button onClick={() => handleAdd(this.refs.title.value, this.refs.body.value, this.refs.author.value, this.refs.category.value)} >Submit</button>
                            }
                      </form>
                   
                    
                </Modal>

            </div>
        )
    }
};

const mapStateToProps = ({ posts,  categories }) => ({
    isOpen: posts.isShowPostDialog, 
    currentPost: posts.currentPost,
    categories
});

const mapDispatchToProps = (dispatch) => ({
    handleClose: () => dispatch(showPostDialog(false)),
    handleAdd: (title, body, author, category) => dispatch(addPost(title, body, author, category)),
    handleUpdate: (id, title, body) => dispatch(updatePost(id, title, body))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPost);
