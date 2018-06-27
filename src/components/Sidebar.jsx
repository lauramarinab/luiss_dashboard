import React, { Component } from 'react';
import Logo from './Logo';
import NavList from './NavList';

class Sidebar extends Component {
  render() {
    return (
      <sidebar>
        <Logo />
        <NavList />
        <div className="bottone" />
      </sidebar>
    );
  }
}

export default Sidebar;
