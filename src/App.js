import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import Header from './components/Header';
import TrendCharts from './components/grafici/TrendCharts';
import NetworkCharts from './components/grafici/NetworkCharts';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Sidebar />
        <Route exact path="/account/trend" render={() => <TrendCharts />} />
        <Route exact path="/account/network" render={() => <NetworkCharts />} />
      </React.Fragment>
    );
  }
}

export default App;
