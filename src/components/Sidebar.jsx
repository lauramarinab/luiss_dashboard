import React, { Component } from 'react';
import Logo from './Logo';
import LogoSmall from './Logo';
import NavList from './NavList';
import arrow from './../img/arrow.svg';
import './../css/Sidebar.css';

class Sidebar extends Component {
  state = {
    sidebar: true,
  };

  handleSidebar = () => {
    this.setState({
      sidebar: !this.state.sidebar,
    });
  };

  render() {
    return (
      <aside
        className={this.state.sidebar ? 'sidebar__open' : 'sidebar__close'}
      >
        {this.state.sidebar ? <Logo /> : <LogoSmall />}

        <NavList />
        <div className="bottone" onClick={this.handleSidebar}>
          <img src={arrow} alt="" className="icon-arrow" />
        </div>
      </aside>
    );
  }
}

export default Sidebar;
