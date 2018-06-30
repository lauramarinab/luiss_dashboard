import React, { Component } from 'react';
import './css/App.css';
// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chart from './components/grafici/Chart';
import NetworkCharts from './components/grafici/NetworkCharts';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Chart />
      </div>
    );
  }
}

export default App;
