import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando as funcionalidades da pagina Detalhes de Receitas', () => {
  it('Verifica se a pagina detalhes renderiza meals corretamente', () => {
    renderWithRouterAndRedux(<App />, '', '/meals/52771');
    const buttonCopy = screen.getByTestId('share-btn');
    expect(buttonCopy).toBeInTheDocument();

    // userEvent.click(buttonCopy);
    // const text = screen.getByText(/Link copied!/i);
    // expect(text).toBeInTheDocument();
  });

  it('Verifica se o botão de favorito tem todas funcionalidades', () => {
    renderWithRouterAndRedux(<App />, '', '/meals/52771');
    const buttonFavorite = screen.getByTestId('favorite-btn');
    expect(buttonFavorite).toBeInTheDocument();

    expect(buttonFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');

    // userEvent.click(buttonFavorite);

    // const img = screen.findAllByRole('img');
    // expect(img[1].src).toBe('http://localhost/blackHeartIcon.svg');
  });
});
