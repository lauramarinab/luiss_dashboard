import React, { Component } from 'react';
import moment from 'moment';
import Axios from 'axios';
import Select from './Select';
import Modal from './Modal';
import Calendario from './Calendar';
import './../../css/chart.css';
import infoIcon from './../../img/info.svg';
// import 'primereact/resources/themes/omega/theme.css';
// import { Calendar } from 'primereact/components/calendar/Calendar';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

class Chart extends Component {
  state = {
    showModal: false,
    openSelect: true,
    date: [],
  };

  setDateRange = e => {
    // console.log(e.value);

    // this.setState({ date: e.value });
    // console.log(rangeArr);
    // if (rangeArr[1] !== null) {}
    this.setState({ date: e.value });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  toggleSelect = () => {
    this.setState({
      openSelect: !this.state.openSelect,
    });
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
        {this.state.showModal && <Modal toggleModal={this.toggleModal} />}
        <div className="chart__header">
          <h2 className="chart__title">{this.props.chartTitle}</h2>
          <img
            alt="icona info"
            src={infoIcon}
            className="chart__icon-info"
            onClick={this.toggleModal}
          />
        </div>
        <div className="chart-background">
          <div className="chart__action-bar">
            {this.props.doesSelectExist && (
              <Select
                isOpen={this.state.openSelect}
                toggleSelect={this.toggleSelect}
                option={[]}
                selectOptions={this.props.selectOptions}
              />
            )}

            <div className="chart__action-select-date" />
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Chart;
