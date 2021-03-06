import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import './css/App.css';
import Sidebar from './components/Sidebar';

import Header from './components/Header';
import Login from './components/Login';
import Homepage from './components/Homepage';
import TrendAccount from './components/account/TrendAccount';
import NetworkAccount from './components/account/NetworkAccount';
import ChordAccount from './components/account/ChordAccount';
import HierarchyAccount from './components/account/HierarchyAccount';
import TrendHashtag from './components/hashtag/TrendHashtag';
import NetworkHashtag from './components/hashtag/NetworkHashtag';
import ChordHashtag from './components/hashtag/ChordHashtag';
import HierarchyHashtag from './components/hashtag/HierarchyHashtag';
import NotFound from './components/notFound';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Sidebar />
        <Route
          exact
          path="/login"
          render={() => <Login fakeAuth={fakeAuth} />}
        />
        <Switch>
          <PrivateRoute exact path="/" component={Homepage} />
          <PrivateRoute exact path="/account/trend" component={TrendAccount} />
          <PrivateRoute
            exact
            path="/account/network"
            component={NetworkAccount}
          />
          <PrivateRoute
            exact
            path="/account/hierarchy"
            component={HierarchyAccount}
          />
          <PrivateRoute exact path="/account/chord" component={ChordAccount} />
          <PrivateRoute exact path="/hashtag/trend" component={TrendHashtag} />
          <PrivateRoute
            exact
            path="/hashtag/network"
            component={NetworkHashtag}
          />
          <PrivateRoute
            exact
            path="/hashtag/hierarchy"
            component={HierarchyHashtag}
          />
          <PrivateRoute exact path="/hashtag/chord" component={ChordHashtag} />
          <PrivateRoute exact component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
