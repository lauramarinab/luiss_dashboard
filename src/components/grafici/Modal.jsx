import React, { Component } from 'react';
import close from './../../img/close.svg';
import './../../css/modal.css';

export default class Modal extends Component {
  render() {
    return (
      <div className="modal__wrapper">
        <img
          src={close}
          alt=""
          className="icon-close"
          onClick={this.props.toggleModal}
        />

        <div className="modal__testo">
          <h3>{this.props.graphExplanation.title}</h3>
          <p>{this.props.graphExplanation.description}</p>
        </div>
      </div>
    );
  }
}
