import React, { Component } from 'react';

class NavList extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <h3>Homepage</h3>
          </li>
          <li>
            <h3>Account</h3>
            <ul>
              <li>Trend</li>
              <li>Network</li>
            </ul>
          </li>
          <li>
            <h3>Hashtag</h3>
            <ul>
              <li>Trend</li>
              <li>Network</li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavList;
