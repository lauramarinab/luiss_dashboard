import React, { Component } from 'react';
import logout from './../img/logout.svg';
import { Link } from 'react-router-dom';
import './../css/header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/login">
          <button className="button__logout">
            <img src={logout} alt="logout" className="account-logout" />
          </button>
        </Link>
      </header>
    );
  }
}

export default Header;
