import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { user } from '../redux/actions';
import '../style/login.scss';
import trybeWallet from '../Walletbranco.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validation);
  };

  validation = () => {
    const { email, password } = this.state;
    const padraoEmail = /\S+@\S+\.\S+/;
    const PASSOWORD_LENGTH = 6;
    const isValid1 = padraoEmail.test(email);
    const isValid2 = password.length >= PASSOWORD_LENGTH;
    const isValid = isValid1 && isValid2;
    this.setState({ isDisable: !isValid });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email, password } = this.state;

    dispatch(user({ email, password }));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div className="login">
        <form onSubmit={ this.handleClick }>
          <img src={ trybeWallet } alt="logo" width={ 300 } />
          <label htmlFor="email-input">
            <input
              className="input is-primary"
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
              placeholder="E-mail"
            />
          </label>
          <label htmlFor="password-input">
            <input
              className="input is-primary"
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
              placeholder="Senha"
            />
          </label>
          <button
            className="button is-black"
            type="submit"
            disabled={ isDisable }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
