import React, { Component } from 'react';
import Select from './Select';
import { Calendar } from 'primereact/components/calendar/Calendar';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import moment from 'moment';
import Modal from './Modal';
import './../../css/modale.css';
import './../../css/chart.css';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModaleIn: false,
      inPage: false,
      date: null,
    };

    this.mostraModale = () => {
      this.setState({
        ModaleIn: !this.state.ModaleIn,
        inPage: true,
      });
    };

    this.nascondiModale = () => {
      this.setState({
        ModaleIn: !this.state.ModaleIn,
        inPage: false,
      });
    };
  }

  onModaleClick = e => this.mostraModale();

  setDateRange = e => {
    console.log(e);
    this.setState({ date: e.value });
    const rangeArr = e.value.map(el => moment(el).format('YYYY-MM-DD'));
    console.log(rangeArr);
  };

  render() {
    return (
      <div className="chart">
        <div className="chart__header">
          <h2 className="chart__title">Titolo</h2>
          <icon className="chart__incon-info" onClick={this.onModaleClick}>
            i
          </icon>
        </div>
        <div className="chart__action-bar">
          <Select />
          <div className="chart__action-select-date">
            <Calendar
              minDate={new Date('2018-04-01')}
              maxDate={new Date('2018-05-24')}
              defaultDate={new Date('2018-04-01')}
              readOnlyInput
              dateFormat="dd/mm/yy"
              selectionMode="range"
              value={this.state.date}
              onChange={e => this.setDateRange(e)}
            // onChange={e => this.setState({ date: e.value })}
            />
          </div>
        </div>
        {this.state.ModaleIn ? (
          <Modal nascondiModale={this.nascondiModale} />
        ) : (
            false
          )}

        {this.props.children}
      </div>
    );
  }
}

export default Chart;
