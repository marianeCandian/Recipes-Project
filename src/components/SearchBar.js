import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchWithFilterMeals, fetchWithFilterDrinks } from '../redux/actions';

export default function SearchBar({ search }) {
  const MAX_LENGTH = 1;
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDispatch = () => {
    const { location: { pathname } } = history;
    if (pathname === '/meals') {
      dispatch(fetchWithFilterMeals(filter, search));
    } else if (pathname === '/drinks') {
      dispatch(fetchWithFilterDrinks(filter, search));
    }
  };

  const handleFirstLetter = String(filter) === 'f=';
  const handleSearch = String(search).length > MAX_LENGTH;
  const condition = handleFirstLetter && handleSearch;

  useEffect(() => {
    if (condition) {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [condition]);

  return (
    <>
      <label
        htmlFor="filter"
      >
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="i="
          name="filter"
          onChange={ ({ target }) => setFilter(target.value) }
        />
        Ingredient
      </label>
      <label
        htmlFor="filter"
      >

        <input
          type="radio"
          data-testid="name-search-radio"
          value="s="
          name="filter"
          onChange={ ({ target }) => setFilter(target.value) }
        />
        Name
      </label>
      <label
        htmlFor="filter"
      >
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="f="
          name="filter"
          onChange={ ({ target }) => setFilter(target.value) }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleDispatch() }
        /* disabled={ condition } */
      >
        Buscar
      </button>
    </>
  );
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
};
