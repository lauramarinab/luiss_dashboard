import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// img
import home from './../img/home.svg';
import account from './../img/account.svg';
import hashtag from './../img/hashtag.svg';

class NavList extends Component {
  stopPropagation = e => {
    e.stopPropagation();
  };

  render() {
    return (
      <nav>
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
              <li>
                <NavLink
                  activeClassName="isActive"
                  exact
                  to="/account/hierarchies"
                >
                  Hierarchies
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="isActive" exact to="/account/chords">
                  Chords
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <div className="icon__h3" onClick={this.props.handleSidebarProp}>
              <img src={hashtag} alt="" className="navigation__icon-hashtag" />
              <h3>HASHTAG</h3>
            </div>
            <ul className="navigation__hashtag">
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
