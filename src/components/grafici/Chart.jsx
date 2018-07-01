import React, { Component } from 'react';
import Select from './Select';
import moment from 'moment';
import Modal from './Modal';
import './../../css/chart.css';
import infoIcon from './../../img/info.svg';
import info from './../../img/info.svg';
import Axios from 'axios';
// import { Calendar } from 'primereact/components/calendar/Calendar';
// import 'primereact/resources/themes/omega/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import Calendario from './Calendar';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModaleIn: false,
      inPage: false,
      date: [],
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
    // console.log(e.value);

    // this.setState({ date: e.value });
    // console.log(rangeArr);
    // if (rangeArr[1] !== null) {}
    this.setState({ date: e.value });
  };

  handleCalendarClick = () => {
    if (this.state.date.length !== 0 && this.state.date[1] !== null) {
      console.log('ho le due date');
      const rangeArr = this.state.date.map(el => {
        if (el !== null) {
          return moment(el).format('YYYY-MM-DD');
        }
        return el;
      });
      console.log(rangeArr);
      const startDate = rangeArr[0];
      const endDate = rangeArr[1];
      this.props.getDates(startDate, endDate);
    }
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
              <img src={this.props.arrow} className="arrow__img" />
              <span>{this.props.accountSelected}</span>

              <ul className="select__ul">
                {this.props.select.map((entity, index) => (
                  <li
                    key={index}
                    className="select__li"
                    onClick={this.props.handleChartSelect}
                  >
                    {entity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="chart__action-select-date">
              <Calendario
                setDateRange={this.setDateRange}
                date={this.state.date}
              >
                <button onClick={this.handleCalendarClick}>Applica</button>
              </Calendario>
              {/* <Calendar
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
              /> */}
            </div>
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Chart;
