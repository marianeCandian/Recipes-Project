import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando os inputs da tela de login', () => {
  it('Testando os inputs email senha e botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailField = screen.getByPlaceholderText('E-mail');
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByPlaceholderText('Senha');
    expect(passwordField).toBeInTheDocument();

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testando a validação do login se passado errado ', () => {
    renderWithRouterAndRedux(<App />);
    const emailField = screen.getByPlaceholderText('E-mail');
    userEvent.type(emailField, '123');
    expect(emailField).toHaveValue('123');

    const passwordField = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordField, 'abc');
    expect(passwordField).toHaveValue('abc');

    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });
  it('Testando a validação do login se passado corretamente ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailField = screen.getByPlaceholderText('E-mail');
    userEvent.type(emailField, 'email@gmail.com');
    expect(emailField).toHaveValue('email@gmail.com');

    const passwordField = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordField, '123123123');
    expect(passwordField).toHaveValue('123123123');

    const btn = screen.getByRole('button');
    expect(btn).toBeEnabled();

    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
