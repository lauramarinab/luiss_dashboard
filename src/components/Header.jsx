import React, { Component } from 'react';
import './../css/header.css';
// import { url } from 'inspector';
import user from './../img/user.svg';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="icona_utente">
          <img src={user} alt="" className="icon-user" />
        </div>
      </header>
    );
  }
}

export default Header;
