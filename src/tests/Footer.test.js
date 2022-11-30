import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando as funcionalidades do Footer', () => {
  it('Verifica se a pagina profile renderiza drinks e meals', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <App />
      </MemoryRouter>,
    );
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
