import React, { Component } from 'react';
import Moment from 'moment';
import Card from './Card';
import './../css/Homepage.css';
import TrendAccount from './account/TrendAccount';
import ChordAccount from './account/ChordAccount';

class Homepage extends Component {
  componentDidMount() {
    const today = new Date();
    console.log(today);
    const yesterday = today.setDate(today.getDate() - 7);
    const yesterdayDay = Moment(yesterday).format('YYYY-MM-DD');
    console.log('yesterday', yesterdayDay);
  }

  render() {
    return (
      <div className="container-homepage ">
        <h2 className="homepage-title">
          Benvenuta Alessandra,{' '}
          <small className="homepage-subtitle">
            ecco i dati twitter LUISS aggiornati degli ultimi sette giorni
          </small>
        </h2>
        <div className="homepage-cards-wrapper container-charts">
          <Card
            titleCard="ACCOUNT PIÙ ATTIVO"
            resultCard="Louiss Guido Carli"
            path="/account/trend"
          />
          <Card
            titleCard="ACCOUNT PIÙ COINVOLGENTE"
            resultCard="Louiss Guido Carli"
            path="/account/trend"
          />
          <Card
            titleCard="HASHTAG PIÙ ATTIVO"
            resultCard="#Louiss Guido Carli"
            path="/hashtag/trend"
          />
          <Card
            titleCard="HASHTAG PIÙ COINVOLGENTE"
            resultCard="#AsanteSanaCoccoBanana"
            path="/hashtag/trend"
          />
        </div>
      </div>
    );
  }
}

export default Homepage;
