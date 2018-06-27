import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavList extends Component {
  render() {
    return (
      <nav>
        <ul className="navigation">
          <li>
            <NavLink activeClassName="isActive" exact to="/">
              <h3>Homepage</h3>
            </NavLink>
          </li>
          <li>
            <h3>Account</h3>
            <ul>
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
            <h3>Hashtag</h3>
            <ul>
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
