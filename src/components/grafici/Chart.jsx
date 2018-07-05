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
    selectedOption: 'luiss guido carli',
    date: [],
    buttonDisabled: true,
  };

  setDateRange = e => {
    if (e.value.length !== 0 && e.value[1] !== null) {
      this.setState({ date: e.value, buttonDisabled: false });
    } else {
      this.setState({ date: e.value, buttonDisabled: true });
    }
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

  showSelectedOption = e => {
    const selectedOption = e.target.innerText;
    // console.log(e.target.innerText);
    this.setState({
      selectedOption,
    });

    this.props.formatDataForLineChart(selectedOption);
  };

  handleCalendarClick = selectedOption => {
    if (this.state.date.length !== 0 && this.state.date[1] !== null) {
      const rangeArr = this.state.date.map(el => {
        if (el !== null) {
          return moment(el).format('YYYY-MM-DD');
        }
        return el;
      });

      const startDate = rangeArr[0];
      const endDate = rangeArr[1];

      if (selectedOption) {
        this.props.getActivityInvolvementDates(
          startDate,
          endDate,
          selectedOption
        );
      } else {
        this.props.getActivityInvolvementDates(startDate, endDate);
      }
    }
  };

  handleRadio = e => {
    if (this.state.date.length !== 0 && this.state.date[1] !== null) {
      const rangeArr = this.state.date.map(el => {
        if (el !== null) {
          return moment(el).format('YYYY-MM-DD');
        }
        return el;
      });

      const startDate = rangeArr[0];
      const endDate = rangeArr[1];
      console.log(endDate);
      this.props.handleCheck(e.target.value, startDate, endDate);
      return;
    }
    console.log('check');
    console.log(e.target.value);
    this.props.handleCheck(e.target.value, '2018-04-01', '2018-05-30');
  };

  render() {
    return (
      <div className="chart">
        {this.state.showModal && (
          <Modal
            toggleModal={this.toggleModal}
            graphExplanation={this.props.graphExplanation}
          />
        )}
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
                selectedOption={this.state.selectedOption}
                showSelectedOption={this.showSelectedOption}
              />
            )}
            {this.props.doesCheckExist && (
              <React.Fragment>
                <div>
                  <label className="container">
                    Attività
                    <input
                      type="radio"
                      name="radio"
                      defaultChecked
                      onChange={e => this.handleRadio(e)}
                      value="activity"
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="container">
                    Coinvolgimento
                    <input
                      type="radio"
                      defaultChecked={false}
                      name="radio"
                      onChange={e => this.handleRadio(e)}
                      value="involvement"
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </React.Fragment>
            )}
            <div className="chart__action-select-date">
              {this.props.doesCalendarExist && (
                <Calendario
                  setDateRange={this.setDateRange}
                  date={this.state.date}
                >
                  <button
                    className="calendar__cta"
                    disabled={this.state.buttonDisabled}
                    onClick={selectedOption => {
                      this.handleCalendarClick(this.state.selectedOption);
                    }}
                  >
                    Applica
                  </button>
                </Calendario>
              )}
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Chart;
