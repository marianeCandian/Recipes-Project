import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const testIdTitle = 'page-title';

describe('Testando as funcionalidades do Header', () => {
  it('Verifica a page done-recipes', () => {
    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <App />
      </MemoryRouter>,
    );
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();

    const title = screen.getByTestId(testIdTitle);
    expect(title).toHaveTextContent('Done Recipes');
  });

  it('Verifica a page meals e ao ir para page profile não tem o search button', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();

    const getButtons = screen.getAllByRole('button');
    expect(getButtons).toHaveLength(4);

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
    expect(getButton).toHaveLength(3);
  });

  it('Verifica se page / não possui um titulo', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '', '/profile');

    const title = screen.getByTestId(testIdTitle);
    expect(title).toHaveTextContent('Profile');

    const getButton = screen.getAllByRole('button');
    expect(getButton).toHaveLength(3);

    history.push('/');

    expect(title).not.toContain();
    const title2 = await screen.findByTestId(testIdTitle);
    expect(title2).toBeInTheDocument();
    const button = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('Verifica a page drinks', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const title = screen.getByTestId(testIdTitle);
    expect(title).toHaveTextContent('Drinks');
  });

  it('Verifica a page favorite-recipes', () => {
    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <App />
      </MemoryRouter>,
    );
    const title = screen.getByTestId(testIdTitle);
    expect(title).toHaveTextContent('Favorite Recipes');
  });

  it('Verifica a page profile', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <App />
      </MemoryRouter>,
    );
    const title = screen.getByTestId(testIdTitle);
    expect(title).toHaveTextContent('Profile');
  });
});
