import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testing SearchBar Component', () => {
  it('Renders correctly all input elements', async () => {
    const { history,
      getAllByRole, getByTestId, store } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    console.log(store);
    const searchBtnEnabler = getByTestId('search-top-btn');
    const radioQtd = getAllByRole('radio');
    expect(radioQtd.length).toBe(3);
    expect(searchBtnEnabler).toBeInTheDocument();
    userEvent.click(searchBtnEnabler);
    userEvent.click(radioQtd[0]);
    userEvent.click(radioQtd[1]);
    userEvent.click(radioQtd[2]);
    userEvent.click(radioQtd[0]);
    const searchBarInput = getByTestId('search-input');
    expect(searchBarInput).toBeInTheDocument();
    userEvent.type(searchBarInput, 'Chicken');
    const fetchSearchBtn = getByTestId('exec-search-btn');
    expect(fetchSearchBtn).toBeInTheDocument();
    userEvent.click(fetchSearchBtn);
    const target = store.getState().search;
    console.log(target);
    expect(await store.getState().search).not.toBe({});
  });
});
