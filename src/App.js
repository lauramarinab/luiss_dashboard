import React, { Component } from 'react';
import './css/App.css';
// import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
<<<<<<< HEAD
import Chart from './components/grafici/Chart'
=======
import Chart from './components/grafici/Chart';
import Header from './components/Header';
import data from './json/luissDays.json';
<<<<<<< HEAD
import data from './json/luissGuidoCarli.json';
=======
>>>>>>> 2a20252d2c76c0014170b827270bfe458e834d9c
>>>>>>> 819cead8c64caa995fcea5949bc383d87ac2cdb6

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
<<<<<<< HEAD
        <Chart />
=======
        <Chart>ciao</Chart>
>>>>>>> 2a20252d2c76c0014170b827270bfe458e834d9c
      </div>
    );
  }
}

export default App;
