import React, { Component } from 'react';
import Select from './Select';
import { Calendar } from 'primereact/components/calendar/Calendar';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import moment from 'moment';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }
  // componentDidCatch() {
  //   console.log(this.state.date);
  //   const newarr = this.state.date.map(el => moment(el).format('l'));
  //   this.setState({
  //     date: newarr,
  //   });
  // }
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
          <icon className="chart__incon-info">i</icon>
        </div>
        <div className="chart__action-bar">
          <Select />
          <div className="chart__action-select-date">
            <Calendar
              dateFormat="dd/mm/yy"
              selectionMode="range"
              value={this.state.date}
              onChange={e => this.setDateRange(e)}
              // onChange={e => this.setState({ date: e.value })}
            />
          </div>
        </div>
        {/* {this.props.children} */}
      </div>
    );
  }
}

export default Chart;
