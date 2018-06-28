import React, { Component } from 'react';
import './css/App.css';
// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chart from './components/grafici/Chart';
import Header from './components/Header';

// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

class App extends Component {
  componentDidMount() {
    console.log(data);
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Chart>ciao</Chart>
        <Logo />
        <NavList />
        <Chart />
        <Sidebar />
      </div>
    );
  }
}

export default App;
