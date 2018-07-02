import React, { Component } from 'react';
import arrow from './../../img/arrow.svg';

class Select extends Component {
  render() {
    console.log(this.props.selectOptions);
    return (
      <div
        className={
          this.props.isOpen
            ? 'select__container__close select__container'
            : 'select__container__open select__container'
        }
        onClick={this.props.toggleSelect}
      >
        <img src={arrow} className="arrow__img" />
        <span>{this.props.selectOptions[0]}</span>

        <ul className="select__ul">
          {this.props.selectOptions.map((entity, index) => (
            <li
              key={index}
              className="select__li"
              // onClick={''}
            >
              {entity}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Select;
