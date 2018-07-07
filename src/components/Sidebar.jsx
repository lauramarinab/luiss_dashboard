import React, { Component } from 'react';
import Logo from './Logo';
import NavList from './NavList';
import arrow from './../img/arrow.svg';
import logoSmall from './../img/logoSmall.gif';
import './../css/Sidebar.css';
import { Link } from 'react-router-dom';

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
      <aside
        className={this.state.sidebar ? 'sidebar__open' : 'sidebar__close'}
        onClick={this.handleSidebar}
      >
        {this.state.sidebar ? (
          <Link exact to="/">
            <Logo />
          </Link>
        ) : (
            <Link exact to="/">
              <img src={logoSmall} alt="" className="logo-small" />
            </Link>
          )}

        <NavList handleSidebarProp={this.openSidebar} />
        <div className="bottone" onClick={this.handleSidebar}>
          <img src={arrow} alt="" className="icon-arrow" />
        </div>
      </aside>
    );
  }
}

export default Sidebar;
