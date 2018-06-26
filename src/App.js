import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Logo from './components/Logo';

class App extends Component {
  render() {
    return (
      <div>
        <Logo />
        <p className="Officina__Sans">Prova Officina Sans</p>
        <p className="Officina__Serif">Prova Officina Serif</p>
      </div>
    );
  }
}

export default App;
