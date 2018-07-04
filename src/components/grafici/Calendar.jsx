import React, { Component } from 'react';
import Moment from 'moment';
import { Calendar } from 'primereact/components/calendar/Calendar';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class Calendario extends Component {
  state = {
    bottone: false,
  };

  // handleFocus = () => {
  //   // console.log('ciao');
  //   this.setState({ bottone: !this.state.bottone });
  // };

  render() {
    return (
      <div className="chart__action-select-date">
        <Calendar
          minDate={new Date('2018-04-01')}
          maxDate={new Date('2018-05-30')}
          defaultDate={new Date('2018-04-01')}
          placeholder={`${Moment(new Date('2018-04-1')).format(
            'DD/MM'
          )} - ${Moment(new Date('2018-05-30')).format('DD/MM')}`}
          readOnlyInput
          dateFormat="dd/mm"
          selectionMode="range"
          value={this.props.date}
          onChange={this.props.setDateRange}
          // onChange={e => this.setState({ date: e.value })}
        />
        {this.props.children}
      </div>
    );
  }
}

export default Calendario;
