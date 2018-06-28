import React, { Component } from 'react';
import './css/App.css';
// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chart from './components/grafici/Chart';
import Header from './components/Header';
import data from './json/luissDays.json';

class App extends Component {
  componentDidMount() {
    console.log(data);
  }

  render() {
    return (
      <div>
        <Header />
        <Chart />
        <Sidebar />
        <Chart>ciao</Chart>
      </div>
    );
  }
}

export default App;
