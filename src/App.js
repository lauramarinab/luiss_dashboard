import React, { Component } from 'react';
import './css/App.css';
// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chart from './components/grafici/Chart';
import data from './json/luissDays.json';

class App extends Component {
  componentDidMount() {
    console.log(data);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Chart>ciao</Chart>
      </div>
    );
  }
}

export default App;
