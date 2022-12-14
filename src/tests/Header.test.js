import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const testIdTitle = 'page-title';
const testIdButton = 'profile-top-btn';

describe('Testando as funcionalidades do Header', () => {
  it('Verifica a page done-recipes', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <App />
      </MemoryRouter>,
    );
    const profileIcon = screen.getByTestId(testIdButton);
    expect(profileIcon).toBeInTheDocument();

    const title = screen.getByTestId(testIdTitle);
    expect(title).toHaveTextContent('Done Recipes');
  });

  it('Verifica a page meals e ao ir para page profile não tem o search button', () => {
    renderWithRouterAndRedux(<App />, '', '/meals');
    const profileIcon = screen.getByTestId(testIdButton);
    expect(profileIcon).toBeInTheDocument();
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();

    const getButtons = screen.getAllByRole('button');
    expect(getButtons).toHaveLength(6);

    const title = screen.getByTestId(testIdTitle);
    expect(title).toHaveTextContent('Meals');

    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchIcon);
    expect(searchInput).not.toBeInTheDocument();

    userEvent.click(profileIcon);

    const title2 = screen.getByTestId(testIdTitle);
    expect(title2).toHaveTextContent('Profile');
    const getButton = screen.getAllByRole('button');
    expect(getButton).toHaveLength(6);
  });

  it('Verifica a page loguin se não contem o header', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const title = screen.getByTestId(testIdTitle);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('');
  });

  it('Verifica a page favorite renderiza o header corretamente', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <App />
      </MemoryRouter>,
    );
    const title = screen.getByTestId(testIdTitle);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Favorite Recipes');
    const profileIcon = screen.getByTestId(testIdButton);
    expect(profileIcon).toBeInTheDocument();
  });
});
