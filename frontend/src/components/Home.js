import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategory } from '../actions/categories';
import Loading from './Loading';
import PostList from './PostList';
import AddBtn from './AddBtn';
import CreateEditPost from './CreateEditPost';
import '../styles/App.css';

class Home extends Component {

    componentDidMount() {
        this.props.categories.length === 0 && this.props.fetchCategories();
    }

    render() {
        const { categories } = this.props;
        return (
            <div className='section'>

                {categories && categories.length > 0
                    ? <div>
                        <div className='nav category-header'>

                            <ol className='category-nav'>
                                <li><Link className='link' to="/" key={'home'}>Home </Link></li>
                                {categories.map(c => (
                                    <li key={c.name}> ||  <Link className='link' to={`/${c.path}`} key={c.name}>  {c.name}</Link></li>
                                ))}
                            </ol>
                        </div>
                        <div className='main'>
                            <AddBtn isPost />
                            <PostList />

                            <CreateEditPost />
                        </div>
                    </div>

                    : <Loading />}
            </div>
        )
    }

}

const mapStateToProps = ({ categories }) => ({
    categories
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategory())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

