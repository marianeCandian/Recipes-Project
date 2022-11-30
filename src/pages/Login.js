import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

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
        onChange={ ({ target: { value } }) => { setEmail(value); } }
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        placeholder="Senha"
        value={ password }
        onChange={ ({ target: { value } }) => { setPassword(value); } }
      />
      <input
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleClick }
        value="Enter"
        disabled={ !enable }
      />
    </form>
  );
}
