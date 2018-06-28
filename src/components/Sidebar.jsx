import React, { Component } from 'react';
import Logo from './Logo';
import NavList from './NavList';
<<<<<<< HEAD
import arrow from './../img/arrow.svg';
=======
>>>>>>> franpa
import './../css/Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: true,
    };
  }

  handleSidebar = () => {
    this.setState({
      sidebar: !this.state.sidebar,
    });
  };

  openSidebar = () => {
    this.setState({
      sidebar: true,
    });
  };

  render() {
    return (
<<<<<<< HEAD
      <aside
        className={this.state.sidebar ? 'sidebar__open' : 'sidebar__close'}
        onClick={this.handleSidebar}
      >
        {this.state.sidebar ? <Logo /> : null}

        <NavList handleSidebarProp={this.openSidebar} />
        <div className="bottone" onClick={this.handleSidebar}>
          <img src={arrow} alt="" className="icon-arrow" />
        </div>
=======
      <aside className="sidebar">
        <Logo />
        <NavList />
        <div className="bottone" />
>>>>>>> franpa
      </aside>
    );
  }
}

export default Sidebar;
