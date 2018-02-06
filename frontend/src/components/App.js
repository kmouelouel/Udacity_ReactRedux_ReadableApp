import React, { Component } from 'react'; 
import { Route, Switch } from 'react-router-dom'; 
import AppHeader from './AppHeader'
import Post from './Post';
import Home from './Home'; 
import Category from './Category';

class App extends Component {
  render() {
      return (
      <div>
              <AppHeader /> 
              <Switch>
                  <Route path='/' exact component={Home} />
                  <Route exact path="/:category" component={Category} />
                  <Route path="/:category/:post_id" component={Post} />
                  <Route render={() => <div><h1>404 Error</h1><h3> Page not found</h3></div>} />
              </Switch>
      </div>
    );
  }
}

export default App;
