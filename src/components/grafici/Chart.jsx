import React, { Component } from 'react';
import Select from './Select';
import Modal from './Modal';
import './../../css/modale.css';
import './../../css/chart.css';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ModaleIn: false,
      inPage: false,
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
            <p>21 aprile - 28 aprile</p>
          </div>
        </div>
        {this.state.ModaleIn ? (
          <Modal nascondiModale={this.nascondiModale} />
        ) : (
          false
        )}

        {/* {this.props.children} */}
      </div>
    );
  }
}

export default Chart;
