import React, { Component } from 'react';

export default class Modal extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <h1>Place Holder info dettagli</h1>
          <button className="button" onClick={this.props.nascondiModale}>
            x
          </button>
        </div>
        <div className="testo">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
      </div>
    );
  }
}
