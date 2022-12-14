import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mockMeal from './detailsMealMock';
import mockDrink from './detailsDrinkMock';

describe('Testando as funcionalidades da pagina Detalhes de Receitas', () => {
  it('Testando se favorita corretamente uma comida', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { DetailsReducer: mockMeal }, '/meals/52795');
    const meal = await screen.findByTestId('recipe-title');
    expect(meal).toHaveTextContent('Chicken Handi');

    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage).toHaveLength(0);

    const favorite = screen.getByTestId('favorite-btn');
    expect(favorite.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(favorite);

    expect(favorite.src).toBe('http://localhost/blackHeartIcon.svg');

    const storage1 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage1).toHaveLength(1);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52795');
  });

  it('Testando se favorita corretamente uma bebida', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { DetailsReducer: mockDrink }, '/drinks/178319');
    const meal = await screen.findByTestId('recipe-title');
    expect(meal).toHaveTextContent('Aquamarine');

    const favorite = screen.getByTestId('favorite-btn');
    userEvent.click(favorite);
    expect(favorite.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(favorite);

    expect(favorite.src).toBe('http://localhost/blackHeartIcon.svg');

    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storage).toHaveLength(2);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
  });
});
