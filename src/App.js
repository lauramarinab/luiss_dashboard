import React, { Component } from 'react';
import './css/App.css';
// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}

export default App;
