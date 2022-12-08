import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchWithFilterMeals, fetchWithFilterDrinks } from '../redux/actions';

export default function SearchBar({ search }) {
  const MAX_LENGTH = 1;
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const magicNumber = 12;

  const meals = useSelector((state) => state.SearchReducer.search.meals);
  const drinks = useSelector((state) => state.SearchReducer.search.drinks);

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
    } else if (meals === null || drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [condition, meals, drinks]);

  if (meals !== undefined && meals !== null && meals.length === 1) {
    const id = meals[0].idMeal;
    history.push(`/meals/${id}`);
  }

  if (drinks !== undefined && drinks !== null && drinks.length === 1) {
    const id = drinks[0].idDrink;
    history.push(`/drinks/${id}`);
  }

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
      >
        Buscar
      </button>
      { meals
        && meals.map((e, i) => (i <= magicNumber
          ? (
            <div key={ i } data-testid={ `${i}-recipe-card` }>
              <img
                src={ e.strMealThumb }
                data-testid={ `${i}-card-img` }
                alt={ e.strMeal }
              />
              <h3 data-testid={ `${i}-card-name` }>{ e.strMeal }</h3>
            </div>)
          : null
        ))}
      { drinks
        && drinks.map((e, i) => (i < magicNumber
          ? (
            <div key={ i } data-testid={ `${i}-recipe-card` }>
              <img
                src={ e.strDrinkThumb }
                data-testid={ `${i}-card-img` }
                alt={ e.strDrink }
              />
              <h3 data-testid={ `${i}-card-name` }>{ e.strDrink }</h3>
            </div>)
          : null
        ))}
    </>
  );
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
};
