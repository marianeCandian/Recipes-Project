import PropTypes from 'prop-types';
import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleClick = () => {
    const { history } = this.props;
    const { email } = this.state;
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/');
  };

  render() {
    const { email, password } = this.state;
    const minLength = 7;
    const passwordValidation = String(password).length >= minLength;
    const EmailValidation = String(email)
      .toLowerCase()
      .match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    const enable = passwordValidation && EmailValidation;

    return (
      <form>
        <input
          type="text"
          name="email"
          data-testid="email-input"
          placeholder="E-mail"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
          onChange={ this.handleChange }
        />
        <input
          type="button"
          data-testid="login-submit-btn"
          onClick={ this.handleClick }
          value="Enter"
          disabled={ !enable }
        />
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
