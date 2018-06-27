import React, { Component } from 'react';
import Logo from './Logo';
import NavList from './NavList';
import './../css/Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <aside className="sidebar">
        <Logo />
        <NavList />
        <div className="bottone" />
      </aside>
    );
  }
}

export default Sidebar;
