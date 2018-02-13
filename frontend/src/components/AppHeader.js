import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const AppHeader = () => (
    <div className="App">
        <header className="App-header"> 
            <h1 className="App-title"><Link to="/" className='link'>Readable</Link> </h1>
        </header>
    </div>
)

export default AppHeader;

