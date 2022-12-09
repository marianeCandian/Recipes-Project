import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando as funcionalidades do Footer', () => {
  it('Verifica se a pagina profile renderiza drinks e meals', () => {
    renderWithRouterAndRedux(<App />);

    const emailField = screen.getByPlaceholderText('E-mail');
    userEvent.type(emailField, 'teste@trybe.com');
    expect(emailField).toHaveValue('teste@trybe.com');

    const passwordField = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordField, '123123123');
    expect(passwordField).toHaveValue('123123123');

    const btn = screen.getByRole('button');
    expect(btn).toBeEnabled();

    userEvent.click(btn);

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinkIcon).toBeInTheDocument();

    const mealIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealIcon).toBeInTheDocument();

    userEvent.click(drinkIcon);

    const testIdTitle = screen.getByTestId('page-title');
    expect(testIdTitle).toHaveTextContent('Drinks');

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);
    const testIdTitle1 = screen.getByTestId('page-title');
    expect(testIdTitle1).toHaveTextContent('Meals');
  });
});
