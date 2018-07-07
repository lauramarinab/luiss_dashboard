import React, { Component } from 'react';
import Moment from 'moment';
import Card from './Card';
import './../css/Homepage.css';
import TrendAccount from './account/TrendAccount';
import ChordAccount from './account/ChordAccount';
import Api from './../data/apiCalls';
import Helper from './../helper';
import Tweet from './../data/tweet.json';

class Homepage extends Component {
  state = {
    firstAccountEntity: '',
    firstAccountFrequency: '',
    firstAccountInvEnt: '',
    firstAccountInvFreq: '',
    firstHashtagActEnt: '',
    firstHashtagActFreq: '',
    firstHashtagInvEnt: '',
    firstHashtagInvFreq: '',
  };
  componentDidMount() {
    console.log(Moment(Tweet[0].created_at).format('YYYY-MM-DD'));
    Api.getTrendAccountDataBy(
      'v155',
      'activity',
      '2018-04-13',
      '2018-04-20'
    ).then(res => {
      this.setState({
        firstAccountEntity: res.data.apiData.data[0].entity,
        firstAccountFrequency: res.data.apiData.data[0].frequency,
      });
    });
    Api.getTrendAccountDataBy(
      'v155',
      'involvement',
      '2018-04-13',
      '2018-04-20'
    ).then(res => {
      this.setState({
        firstAccountInvEnt: res.data.apiData.data[0].entity,
        firstAccountInvFreq: Helper.formatDecimalData(
          res.data.apiData.data[0].frequency
        ),
      });
    });
    Api.getTrendHashtagDataBy(
      'v155',
      'activity',
      '2018-04-13',
      '2018-04-20'
    ).then(res => {
      this.setState({
        firstHashtagActEnt: res.data.apiData.data[0].entity,
        firstHashtagActFreq: res.data.apiData.data[0].frequency,
      });
    });
    Api.getTrendHashtagDataBy(
      'v155',
      'involvement',
      '2018-04-13',
      '2018-04-20'
    ).then(res => {
      this.setState({
        firstHashtagInvEnt: res.data.apiData.data[0].entity,
        firstHashtagInvFreq: Helper.formatDecimalData(
          res.data.apiData.data[0].frequency
        ),
      });
    });
    const today = new Date();

    const yesterday = today.setDate(today.getDate() - 7);
    const yesterdayFormatted = Moment(yesterday).format('YYYY-MM-DD');
    const todayFormatted = Moment(today).format('YYYY-MM-DD');
  }

  render() {
    return (
      <div className="container-homepage ">
        <h2 className="homepage-title">
          Benvenuta Alessandra,{' '}
          <small className="homepage-subtitle">
            ecco gli account e gli hashtag Luiss più attivi e coinvolgenti degli
            ultimi 7 giorni
          </small>
        </h2>
        <div className="homepage-cards-wrapper container-charts">
          <Card
            titleCard="ACCOUNT PIÙ ATTIVO"
            resultCard={this.state.firstAccountInvEnt}
            resultNumber={this.state.firstAccountFrequency}
            path="/account/trend"
          />
          <Card
            titleCard="ACCOUNT PIÙ COINVOLGENTE"
            resultCard={this.state.firstAccountEntity}
            resultNumber={this.state.firstAccountInvFreq}
            path="/account/trend"
          />
          <Card
            titleCard="HASHTAG PIÙ ATTIVO"
            resultCard={this.state.firstHashtagActEnt}
            resultNumber={this.state.firstHashtagActFreq}
            path="/hashtag/trend"
          />
          <Card
            titleCard="HASHTAG PIÙ COINVOLGENTE"
            resultCard={this.state.firstHashtagInvEnt}
            resultNumber={this.state.firstHashtagInvFreq}
            path="/hashtag/trend"
          />
        </div>
      </div>
    );
  }
}

export default Homepage;
