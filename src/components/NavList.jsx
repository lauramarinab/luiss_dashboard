import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
<<<<<<< HEAD
// img
import home from './../img/home.svg';
import account from './../img/account.svg';
import hashtag from './../img/hashtag.svg';
=======
>>>>>>> franpa

class NavList extends Component {
  stopPropagation = e => {
    e.stopPropagation();
  };

  render() {
    return (
      <nav>
<<<<<<< HEAD
        <ul className="navigation" onClick={this.stopPropagation}>
          <li>
            <NavLink activeClassName="isActive" exact to="/">
              <div className="icon__h3" onClick={this.props.handleSidebarProp}>
                <img src={home} alt="" className="navigation__icon-home" />
                <h3>HOMEPAGE</h3>
              </div>
            </NavLink>
          </li>
          <li>
            <div className="icon__h3" onClick={this.props.handleSidebarProp}>
              <img src={account} alt="" className="navigation__icon-account" />
              <h3>ACCOUNT</h3>
            </div>
            <ul className="navigation__account">
=======
        <ul className="navigation">
          <li>
            <NavLink activeClassName="isActive" exact to="/">
              <h3>Homepage</h3>
            </NavLink>
          </li>
          <li>
            <h3>Account</h3>
            <ul>
>>>>>>> franpa
              <li>
                <NavLink activeClassName="isActive" exact to="/account/trend">
                  Trend
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="isActive" exact to="/account/network">
                  Network
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
<<<<<<< HEAD
            <div className="icon__h3" onClick={this.props.handleSidebarProp}>
              <img src={hashtag} alt="" className="navigation__icon-hashtag" />
              <h3>HASHTAG</h3>
            </div>
            <ul className="navigation__hashtag">
=======
            <h3>Hashtag</h3>
            <ul>
>>>>>>> franpa
              <li>
                <NavLink activeClassName="isActive" exact to="/hashtag/trend">
                  Trend
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="isActive" exact to="/hashtag/network">
                  Network
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavList;
