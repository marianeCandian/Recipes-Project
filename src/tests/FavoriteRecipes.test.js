import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mockMeal from './detailsMealMock';
import mockDrink from './detailsDrinkMock';

const chiken = 'Chicken Handi';
const favoriteName = '0-horizontal-name';

describe('Testando as funcionalidades da tela de Receitas Favoritas', () => {
  it('Testando se favorita corretamente uma comida', async () => {
    renderWithRouterAndRedux(<App />, { DetailsReducer: mockMeal }, '/meals/52795');
    const meal = await screen.findByTestId('recipe-title');
    expect(meal).toHaveTextContent(chiken);

    const favorite = screen.getByTestId('favorite-btn');
    expect(favorite.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(favorite);

    expect(favorite.src).toBe('http://localhost/blackHeartIcon.svg');
  });

  it('Testando se favorita corretamente uma bebida', async () => {
    renderWithRouterAndRedux(<App />, { DetailsReducer: mockDrink }, '/drinks/178319');
    const meal = await screen.findByTestId('recipe-title');
    expect(meal).toHaveTextContent('Aquamarine');

    const favorite = screen.getByTestId('favorite-btn');
    userEvent.click(favorite);
    expect(favorite.src).toBe('http://localhost/whiteHeartIcon.svg');

    userEvent.click(favorite);

    expect(favorite.src).toBe('http://localhost/blackHeartIcon.svg');
  });

  it('Testando se renderiza corretamente a pagina de Favoritos', () => {
    renderWithRouterAndRedux(<App />, '', '/favorite-recipes');

    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    expect(btnMeals).toBeInTheDocument();

    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(btnDrinks).toBeInTheDocument();

    const btnAll = screen.getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();

    const meal = screen.getByTestId(favoriteName);
    expect(meal).toHaveTextContent(chiken);

    const drink = screen.getByTestId('1-horizontal-name');
    expect(drink).toHaveTextContent('Aquamarine');

    userEvent.click(btnMeals);
    expect(meal).toBeInTheDocument();
    expect(drink).not.toBeInTheDocument();

    userEvent.click(btnDrinks);
    const drink2 = screen.getByTestId(favoriteName);
    expect(drink2).toHaveTextContent('Aquamarine');

    userEvent.click(btnAll);
    const meal1 = screen.getByTestId(favoriteName);
    expect(meal1).toHaveTextContent(chiken);

    const drink1 = screen.getByTestId('1-horizontal-name');
    expect(drink1).toHaveTextContent('Aquamarine');

    const btnShare = screen.getByTestId('0-horizontal-share-btn');
    expect(btnShare).toBeInTheDocument();
  });

  it('Testando se desfavorita corretamente a comida e a bebida', () => {
    renderWithRouterAndRedux(<App />, '', '/favorite-recipes');

    const btnFavorite = screen.getByTestId('0-horizontal-favorite-btn');
    expect(btnFavorite).toBeInTheDocument();

    const meal = screen.getByTestId(favoriteName);
    expect(meal).toHaveTextContent(chiken);

    userEvent.click(btnFavorite);

    expect(meal).toHaveTextContent('Aquamarine');

    const btnFavorite1 = screen.getByTestId('0-horizontal-favorite-btn');
    expect(btnFavorite1).toBeInTheDocument();

    const drink = screen.getByTestId(favoriteName);
    expect(drink).toHaveTextContent('Aquamarine');

    userEvent.click(btnFavorite);

    expect(drink).not.toBeInTheDocument();
  });
});
