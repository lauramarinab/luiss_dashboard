import React, { Component } from 'react';
import './../css/Sidebar.css';
import arrow from './../img/arrow.svg';
import './../css/Card.css';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    console.log(this.props.path);
    return (
      <div className="cards-wrapper">
        <h3 className="card-title"> {this.props.titleCard}</h3>
        <p className="card-result"> {`#${this.props.resultCard}`} </p>
        <p className="card-result"> {this.props.resultNumber} </p>
        <div className="card">
          {/* <Link exact to={this.props.path}>
            <div className="card-bottone">
              <img src={arrow} alt="" className="card-icon" />
            </div>
          </Link> */}
        </div>
      </div>
    );
  }
}
