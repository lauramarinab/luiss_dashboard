import React, { Component } from 'react';
import './css/App.css';
import Logo from './components/Logo';
import NavList from './components/NavList';
import Chart from './components/grafici/Chart';
// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Logo />
        {/* <p className="Officina__Sans">Prova Officina Sans</p>
        <p className="Officina__Serif">Prova Officina Serif</p> */}
        <NavList />
        <Chart />
        <Sidebar />
      </div>
    );
  }
}

export default App;
