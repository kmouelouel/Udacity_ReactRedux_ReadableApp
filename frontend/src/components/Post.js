import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { voteComment, fetchComments } from '../actions/comments';
import CreateEditComment from './CreateEditComment';
import CommentList from './CommentList';
import AddBtn from './AddBtn';
import { fetchOnePost, votePost } from '../actions/posts';
import PostDetail from './PostDetail';
import CreateEditPost from './CreateEditPost';
import Loading from './Loading';



class Post extends Component {

    handleVote = (t, c, option) => {
        t === 'post' && this.props.votePost(c, option);
        t === 'comment' && this.props.voteComment(c, option);
    }

    componentDidMount() {
        const { match } = this.props;
        this.props.fetchOnePost(match.params.post_id);
        this.props.fetchComments(match.params.post_id);
    }

    render() {
        const { post, match, comments, history } = this.props
        return (
            <div>
                {post
                    ? post.id
                        ?
                        <div className='section'>
                            <div className='nav'>
                                <div className='category-nav'>
                                    <Link to="/" className='link'>Home</Link> / <Link to={`/${match.params.category}`}>{match.params.category}</Link> / {post.title}
                                </div>
                            </div>

                            <div className='main'>
                                <AddBtn isComment />
                                <PostDetail post={post} handleVote={this.handleVote} history={history} />
                                <CommentList comments={comments} handleVote={this.handleVote} />
                                <CreateEditPost />
                                <CreateEditComment parentId={post.id} />
                            </div>
                        </div>
                        : 'not exist. Error.'
                    : <Loading />
                }
            </div >
        );
    }
}

const mapStateToProps = ({ posts, comments }) => ({
    post: posts.posts[0],
    ...comments
});

const mapDispatchToProps = (dispatch) => ({
    fetchOnePost: (post_id) => dispatch(fetchOnePost(post_id)),
    fetchComments: (post_id) => dispatch(fetchComments(post_id)),
    votePost: (post, option) => dispatch(votePost(post, option)),
    voteComment: (comment, option) => dispatch(voteComment(comment, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
