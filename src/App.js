import React, { Component } from 'react';
import './css/App.css';
// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chart from './components/grafici/Chart';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Chart />
        <Sidebar />
      </div>
    );
  }
}

export default App;
