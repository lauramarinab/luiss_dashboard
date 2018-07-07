import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from './Logo';
import '../css/Login.css';

import isEmail from 'validator/lib/isEmail';

class Login extends Component {
  state = {
    value: '',
    listaPersone: [],
    emailErrorMessage: '',
    password: '',
    email: '',
    passwordErrorMessage: '',
    disabledButton: true,
    redirectToReferrer: false,
  };

  onPasswordChange = e => {
    const newState = { ...this.state.infoPersona };
    newState.password = e.target.value;
    if (
      newState.password.length < 6 ||
      (newState.email && !isEmail(newState.email))
    ) {
      this.setState({
        passwordErrorMessage: 'Minimo deve contenere 6 caratteri',
      });
    } else if (newState.password.length >= 6) {
      this.setState({
        password: e.target.value,
        passwordErrorMessage: '',
      });
    }
  };

  onEmailChange = e => {
    const newState = { ...this.state.infoPersona };
    newState.email = e.target.value;

    if (newState.email && !isEmail(newState.email)) {
      this.setState({
        emailErrorMessage: 'Email non valida',
      });
    } else if (newState.email && isEmail(newState.email)) {
      this.setState({
        email: e.target.value,
        emailErrorMessage: '',
      });
    }
  };

  handleLogin = e => {
    e.preventDefault();
    if (this.state.password === '') {
      this.setState({
        passwordErrorMessage: 'Questo campo è obbligatorio!',
      });
    }
    if (this.state.email === '') {
      this.setState({
        emailErrorMessage: 'Questo campo è obbligatorio!',
      });
    } else if (this.state.password && isEmail(this.state.email)) {
      this.setState({
        passwordErrorMessage: '',
        emailErrorMessage: '',
        disabledButton: false,
      });
    } else {
    }
    this.props.fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true,
      }));
    });
  };

  render() {
    const { redirectToReferrer } = this.state.redirectToReferrer;

    if (redirectToReferrer === true) {
      return <Redirect to="/" />;
    }
    return (
      <div id="login">
        <div className="form__intro">
          <div className="intro__logo">
            <Logo />
          </div>
          <form autoComplete="false" className="form">
            <div className="intro__body">
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="intro__input"
                onChange={this.onEmailChange}
              />

              <span className="intro__input__messaggio__errore">
                {this.state.emailErrorMessage}
              </span>

              <input
                type="password"
                placeholder="Password (minimo 6 caratteri)"
                className="intro__input"
                name="password"
                onChange={this.onPasswordChange}
              />
              <span className="intro__input__messaggio__errore">
                {this.state.passwordErrorMessage}
              </span>

              <button className="intro__btn" onClick={this.handleLogin}>
                Accedi
              </button>
              {this.state.password !== '' &&
              this.state.email !== '' &&
              this.state.disabledButton === false ? (
                <Redirect to="/" />
              ) : null}
            </div>
          </form>
          <div className="another-info__container">
            <span>Hai dimenticato la password?</span>
            <span>Nuovo account</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
