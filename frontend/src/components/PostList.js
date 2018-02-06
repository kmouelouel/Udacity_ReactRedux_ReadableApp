import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCatPosts, fetchPosts, sortPost } from '../actions/posts' 
import PostTable from './PostTable';

class PostList extends Component {

    changeSortHandler = (key) => {
        const { sortPost, sortOrder } = this.props;
        sortPost(key, sortOrder === 'desc' ? 'asc' : 'desc');
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const { posts, sortKey, sortOrder } = this.props;
        return (
            <div>
                <div>
                    <PostTable
                        posts={posts}
                        sortKey={sortKey}
                        sortOrder={sortOrder}
                        changeSortHandler={this.changeSortHandler}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ posts, categories }, ownProps) => {
    return ({
        posts: posts.posts.filter(post => (!ownProps.catFilter ? true : post.category === ownProps.catFilter ? true : false)),
        sortKey: posts.sortKey,
        sortOrder: posts.sortOrder
    })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPosts: () => !ownProps.catFilter ? dispatch(fetchPosts()) : dispatch(fetchCatPosts(ownProps.catFilter)),
    sortPost: (key, order) => dispatch(sortPost(key, order))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
