import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Logo from './components/Logo';
import NavList from './components/NavList';
import Chart from './components/grafici/Chart';

class App extends Component {
  render() {
    return (
      <div>
        <Logo />
        <p className="Officina__Sans">Prova Officina Sans</p>
        <p className="Officina__Serif">Prova Officina Serif</p>
        <NavList />
        <Chart />
      </div>
    );
  }
}

export default App;
