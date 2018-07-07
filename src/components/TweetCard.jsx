import React, { Component } from 'react';
import retweetIcon from './../img/retweet.svg';
import './../css/TweetCard.css';

export default class TweetCard extends Component {
  render() {
    return (
      <div className="wrapper-tweet">
        <div className="username-tweet">
          <h3 className="complete-name">{this.props.username}</h3>
          <h3 className="user-name">@{this.props.userScreename}</h3>
        </div>
        <p className="text-tweet">{this.props.text}</p>
        <div className="footer-tweet">
          <p className="data-tweet">{this.props.data}</p>
          <div className="re-tweet">
            <img className="icon-retweet" src={retweetIcon} alt="retweet" />
            <p className="num-retweet">{this.props.retweetCount}</p>
          </div>
        </div>
      </div>
    );
  }
}
