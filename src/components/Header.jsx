import React, { Component } from 'react';
import account from './../img/account.svg';
import './../css/header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <img src={account} alt="" className="account-icon" />
      </header>
    );
  }
}

export default Header;
