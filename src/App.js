import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
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
        {/* <Route
          exact
          path="/login"
          render={() => <Login fakeAuth={fakeAuth} />}
        /> */}
        <Route exact path="/account/trend" component={TrendAccount} />
        <Route exact path="/account/network" component={NetworkAccount} />
        <Route exact path="/account/hierarchy" component={HierarchyAccount} />
        <Route exact path="/account/chord" component={ChordAccount} />
        <Route exact path="/hashtag/trend" component={TrendHashtag} />
        <Route exact path="/hashtag/network" component={NetworkHashtag} />
        <Route exact path="/hashtag/hierarchy" component={HierarchyHashtag} />
        <Route exact path="/hashtag/chord" component={ChordHashtag} />

        {/* <PrivateRoute exact path="/" component={Homepage} />
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
        <PrivateRoute exact path="/account/chord" component={ChordAccount} /> */}
      </React.Fragment>
    );
  }
}

export default App;
