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
                    <h3>Post</h3>
                    <table>  
                        <tbody>
                            <tr><td>Category</td><td>
                            {currentPost.id
                                ? null
                                :
                                        <select ref="category">
                                       {categories.map(c => (
                                        <option key={c.name} value={c.name}>{c.name}</option>
                                        ))}
                                        </select>
                          
                            }  </td></tr>
                            <tr><td>Title</td><td>
                            {currentPost.id
                                ?<input type="text" ref="title" placeholder={currentPost.title} /> 
                                :  <input type="text" ref="title" />
                            }
                                </td></tr>
                            <tr><td>Author</td><td>
                                {currentPost.id
                                ? <input type="text" ref="author" placeholder={currentPost.author} />
                                : <input type="text" ref="author" />
                                }
                            </td></tr>
                            <tr><td>Detail</td><td>
                            {currentPost.id
                                ?<textarea cols="72" rows="4" ref="body"  placeholder={currentPost.body} /> 
                                : <textarea cols="72" rows="4" ref="body"  />
                            }
                            </td></tr>
                        </tbody>
                    </table>
                    <button onClick={handleClose}>Cancel</button>                               
                    {currentPost.id
                        ? <button onClick={() => handleUpdate(currentPost.id, this.refs.title.value, this.refs.body.value)}>Submit</button>
                        : <button onClick={() => handleAdd(this.refs.title.value, this.refs.body.value, this.refs.author.value,this.refs.category.value)} >Submit</button>
                    }
                    
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
