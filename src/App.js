import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Logo from './components/Logo';
import NavList from './components/NavList';

class App extends Component {
  render() {
    return (
      <div>
        <Logo />
        <p className="Officina__Sans">Prova Officina Sans</p>
        <p className="Officina__Serif">Prova Officina Serif</p>
        <NavList />
      </div>
    );
  }
}

export default App;
