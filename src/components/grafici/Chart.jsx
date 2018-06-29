import React, { Component } from 'react';
import Select from './Select';
import moment from 'moment';
import Modal from './Modal';
import './../../css/chart.css';
import infoIcon from './../../img/info.svg';
import arrow from './../../img/arrow.svg';
import info from './../../img/info.svg';
import { Calendar } from 'primereact/components/calendar/Calendar';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModaleIn: false,
      inPage: false,
      date: null,
      openSelect: true,
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

    this.toggleSelect = () => {
      this.setState({
        openSelect: !this.state.openSelect,
      });
    };
  }

  onModaleClick = () => this.mostraModale();

  setDateRange = e => {
    console.log(e);
    this.setState({ date: e.value });
    const rangeArr = e.value.map(el => moment(el).format('YYYY-MM-DD'));
    console.log(rangeArr);
  };

  render() {
    return (
      <div className="chart">
        {this.state.ModaleIn ? (
          <Modal nascondiModale={this.nascondiModale} />
        ) : (
          false
        )}
        <div className="chart__header">
          <h2 className="chart__title">{this.props.title}</h2>
          <img
            src={infoIcon}
            alt=""
            className="chart__icon-info"
            onClick={this.onModaleClick}
          />
        </div>
        <div className="chart-background">
          <div className="chart__action-bar">
            <div
              className={
                this.state.openSelect
                  ? 'select__container__close'
                  : 'select__container__open'
              }
              onClick={this.toggleSelect}
            >
              <span>ESEMPIO</span>
              <ul className="select__ul">
                <li className="select__li">Lorem</li>
                <li className="select__li">Ipsum</li>
                <li className="select__li">Ipsum</li>
              </ul>
              <img src={arrow} className="arrow__img" />
            </div>

            <div className="chart__action-select-date">
              <Calendar
                minDate={new Date('2018-04-01')}
                maxDate={new Date('2018-05-24')}
                defaultDate={new Date('2018-04-01')}
                placeholder="seleziona un periodo"
                readOnlyInput
                dateFormat="dd/mm/yy"
                selectionMode="range"
                value={this.state.date}
                onChange={e => this.setDateRange(e)}
                // onChange={e => this.setState({ date: e.value })}
              />
            </div>
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Chart;
