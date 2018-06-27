import React, { Component } from 'react';
import Select from './Select';

class Chart extends Component {
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
            <p>21 aprile - 28 aprile</p>
          </div>
        </div>
        {/* {this.props.children} */}
      </div>
    );
  }
}

export default Chart;
