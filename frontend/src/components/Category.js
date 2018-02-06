import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import CreateEditPost from './CreateEditPost';
import AddBtn from './AddBtn';

const Category = (props) => {
    const { match } = props;
    return (
        <div className='section'>
            <div className='nav'>
                <div className='category-nav'>
                    <Link to="/" className='link'>Home</Link> / {match.params.category}
                </div>
            </div>

            <div className='main'>
                <AddBtn isPost />
                <PostList catFilter={match.params.category} />
                <CreateEditPost />
            </div>
        </div >
    );
}

export default Category;
