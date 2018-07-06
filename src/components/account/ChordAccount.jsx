import React, { Component } from 'react';
import Moment from 'moment';
import Chord from './../grafici/ChordCharts';
import Api from '../../data/apiCalls';
import './../../css/chart.css';
import Spinner from './../Spinner';
import Chart from './../grafici/Chart';
import graphExplanation from './../../data/graphExplanations.json';
import Helper from './../../helper';
import ChordDiagram from 'react-chord-diagram';
import axios from 'axios';

class ChordAccount extends Component {
  state = {
    isLoading: true,
    accountMa: '',
    competitorMa: '',
    startDate: '2018-04-01',
    endDate: '2018-05-30',
    com: '',
    acc: '',
    limit1: 5,
    limit2: 5,
  };

  componentDidMount() {
    Api.getAllChordData().then(res => {
      this.setState({
        accountMa: res[0].data.apiData.chord.data,
        competitorMa: res[1].data.apiData.chord.data,
        isLoading: false,
      });
    });
  }

  componentDidUpdate() {
    if (
      this.state.accountMa !== undefined &&
      this.state.accountMa !== this.state.oldData
    ) {
      this.setState({
        oldData: this.state.accountMa,
      });
      this.ProcessData(this.state.competitorMa, 'com');
      this.ProcessData(this.state.accountMa, 'acc');
    }
  }

  ProcessData(type, custom) {
    this[custom] = [];
    let data = type;
    // console.log(data);
    data = Object.values(data);
    const singleList = [];
    let el;
    for (let i = 0; i < data.length; i++) {
      this[custom].push([]);
      for (let j = 0; j < data[i].length; j++) {
        el = null;
        const tempel = singleList.find(el => {
          if (el === data[i][j].source || el === data[i][j].target) {
            return el;
          }
        });
        if (tempel !== undefined) {
          el = tempel;
        }
        if (el === null) {
          singleList.push(data[i][j].source);
        } else {
          el = null;
        }
      }
    }
    for (let i = 0; i < this[custom].length; i++) {
      for (let j = 0; j < this[custom].length; j++) {
        this[custom][i].push(0);
      }
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const source = singleList.findIndex(el => {
          if (el === data[i][j].source) {
            return true;
          }
          return false;
        });
        const target = singleList.findIndex(el => {
          if (el === data[i][j].target) {
            return true;
          }
          return false;
        });
        if (
          target !== undefined &&
          source !== undefined &&
          source >= 0 &&
          target >= 0
        ) {
          this[custom][source][target] =
            this[custom][source][target] + data[i][j].frequency;
        }
      }
    }
    this.setState({
      [custom]: singleList,
    });
  }

  handleCalendar = (starttDate, endDatte) => {
    Api.getDataBy(
      'v155',
      'chord',
      'ma',
      starttDate,
      endDatte,
      this.state.limit1
    ).then(data => {
      const account = data.data.apiData.chord.data;
      this.setState({
        accountMa: data.data.apiData.chord.data,
        startDate: starttDate,
        endDate: endDatte,
      });

      this.ProcessData(account, 'acc');
    });
  };

  handleCalendar2 = (starttDate, endDatte) => {
    Api.getDataBy(
      'v158',
      'chord',
      'ma',
      starttDate,
      endDatte,
      this.state.limit2
    ).then(data => {
      const competitor = data.data.apiData.chord.data;
      this.setState({
        competitorMa: data.data.apiData.chord.data,
        startDate: starttDate,
        endDate: endDatte,
      });
      this.ProcessData(competitor, 'com');
    });
  };

  handleSelect = limite => {
    Api.getDataBy(
      'v155',
      'chord',
      'ma',
      this.state.startDate,
      this.state.endDate,
      limite
    ).then(data => {
      const account = data.data.apiData.chord.data;
      this.setState({
        accountMa: data.data.apiData.chord.data,
        limit: limite,
      });
      this.ProcessData(account, 'acc');
    });
  };

  handleSelect2 = limite => {
    Api.getDataBy(
      'v158',
      'chord',
      'ma',
      this.state.startDate,
      this.state.endDate,
      limite
    ).then(data => {
      const competitor = data.data.apiData.chord.data;
      this.setState({
        competitorMa: data.data.apiData.chord.data,
        limit: limite,
      });
      this.ProcessData(competitor, 'com');
    });
  };

  render() {
    return (
      <div className="container-charts chord-charts">
        {this.state.isLoading && <Spinner />}
        {!this.state.isLoading && (
          <React.Fragment>
            <Chart
              chartTitle="Quali sono gli account che hanno utilizzato almeno un hashtag insieme?"
              doesSelectExist
              selectOptions={['5', '10', '20', '30', '40', '50']}
              selectedOption="5"
              graphExplanation={graphExplanation[3]}
              doesCalendarExist
              getActivityInvolvementDates={this.handleCalendar}
              formatDataForLineChart={this.handleSelect}
            >
              <Chord matrix={this.acc} names={this.state.acc} />
            </Chart>
            <Chart
              chartTitle="Quali sono i competitor che hanno utilizzato almeno un hashtag insieme?"
              doesSelectExist
              selectOptions={['5', '10', '20', '30', '40', '50']}
              selectedOption="5"
              graphExplanation={graphExplanation[3]}
              doesCalendarExist
              getActivityInvolvementDates={this.handleCalendar2}
              formatDataForLineChart={this.handleSelect2}
            >
              <Chord matrix={this.com} names={this.state.com} />
            </Chart>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ChordAccount;
