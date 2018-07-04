import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';
import Sidebar from './components/Sidebar';

import Header from './components/Header';
import TrendAccount from './components/account/TrendAccount';
import NetworkAccount from './components/account/NetworkAccount';
import ChordAccount from './components/account/ChordAccount';
import HierarchyAccount from './components/account/HierarchyAccount';
import TrendHashtag from './components/hashtag/TrendHashtag';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Sidebar />
        <Route exact path="/account/trend" component={TrendAccount} />
        <Route exact path="/account/network" component={NetworkAccount} />
        <Route exact path="/account/hierarchy" component={HierarchyAccount} />
        <Route exact path="/account/chord" component={ChordAccount} />
        <Route exact path="/hashtag/trend" component={TrendHashtag} />
      </React.Fragment>
    );
  }
}

export default App;
