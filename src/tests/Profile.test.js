import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando as funcionalidades do Profile', () => {
  it('Verifica se a pagina profile renderiza corretamente', () => {
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

    const bntProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(bntProfile);

    const testIdTitle = screen.getByTestId('page-title');
    expect(testIdTitle).toHaveTextContent('Profile');

    const btnDoneRecepis = screen.getByTestId('profile-done-btn');
    expect(btnDoneRecepis).toBeInTheDocument();

    userEvent.click(btnDoneRecepis);

    const testIdTitle2 = screen.getByTestId('page-title');
    expect(testIdTitle2).toHaveTextContent('Done Recipes');

    const bntProfile2 = screen.getByTestId('profile-top-btn');
    userEvent.click(bntProfile2);

    const btnFavoriteRecepis = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavoriteRecepis);

    const testIdTitle3 = screen.getByTestId('page-title');
    expect(testIdTitle3).toHaveTextContent('Favorite Recipes');

    const bntProfile3 = screen.getByTestId('profile-top-btn');
    userEvent.click(bntProfile3);

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('email@gmail.com');

    const bntLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(bntLogout);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
