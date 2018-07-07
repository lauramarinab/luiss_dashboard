import React, { Component } from 'react';
import './../css/Sidebar.css';
import './../css/Card.css';

export default class Card extends Component {
  render() {
    return (
      <div className="cards-wrapper">
        <h3 className="card-title"> {this.props.titleCard}</h3>
        <p className="card-result"> {`#${this.props.resultCard}`} </p>
        <p className="card-result-num"> {this.props.resultNumber} </p>
        <div className="card" />
      </div>
    );
  }
}
