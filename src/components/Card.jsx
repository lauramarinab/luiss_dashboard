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
        <h3> {this.props.titleCard}</h3>
        <p> {this.props.resultCard} </p>
        <div className="card">
          <Link exact to={this.props.path}>
            <div className="bottone">
              <img src={arrow} alt="" className="icon" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
