import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchRecipesMeals, fetchRecipesDrinks } from '../redux/actions';

export default function RecipeDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.DetailsReducer.details.meals);
  const drinks = useSelector((state) => state.DetailsReducer.details.drinks);

  const handleDispatch = () => {
    const { location: { pathname } } = history;
    const id = pathname.split('/');
    if (pathname.includes('/meals')) {
      dispatch(fetchRecipesMeals(id[2]));
    } else if (pathname.includes('/drinks')) {
      dispatch(fetchRecipesDrinks(id[2]));
    }
  };

  const convertVideo = (url) => {
    const magicNumber = 3;
    const modifyURL = url.split('/');
    const final = modifyURL[3].split('=');
    modifyURL.splice(magicNumber, 1, '/embed/');
    modifyURL.push(final[1]);
    modifyURL.splice(1, 1, '//');
    return modifyURL.join('');
  };

  const filterMeals = () => {
    const magicNumber = 100;
    const array = [];
    for (let i = 1; i < magicNumber; i += 1) {
      const ingredientes = `strIngredient${i}`;
      const measure = `strMeasure${i}`;
      if (meals[0][ingredientes] !== undefined && meals[0][ingredientes] !== null
          && meals[0][ingredientes].length > 0) {
        array.push(`${meals[0][ingredientes]}  -  ${meals[0][measure]}`);
      }
    }
    return array;
  };

  const filterDrinks = () => {
    const magicNumber = 100;
    const array = [];
    for (let i = 1; i < magicNumber; i += 1) {
      const ingredientes = `strIngredient${i}`;
      const measure = `strMeasure${i}`;
      if (drinks[0][ingredientes] !== undefined && drinks[0][ingredientes] !== null
          && drinks[0][ingredientes].length > 0) {
        array.push(`${drinks[0][ingredientes]}  -  ${drinks[0][measure]}`);
      }
    }
    return array;
  };

  const fetchRecommendationMeals = async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  };

  const fetchRecommendationDrinks = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    handleDispatch();
    fetchRecommendationMeals();
    fetchRecommendationDrinks();
  }, []);

  return (
    <>
      { drinks
        && drinks.map((e, i) => (
          <div key={ i }>
            <img data-testid="recipe-photo" src={ e.strDrinkThumb } alt={ e.strDrink } />
            <h3 data-testid="recipe-title">{ e.strDrink }</h3>
            <p data-testid="recipe-category">{ e.strAlcoholic }</p>
            { filterDrinks().map((el, index) => (
              <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                <li>{ el }</li>
              </ul>
            ))}
            <p data-testid="instructions">{ e.strInstructions }</p>
          </div>
        ))}
      { meals
      && meals.map((e, i) => (
        <div key={ i }>
          <img data-testid="recipe-photo" src={ e.strMealThumb } alt={ e.strMeal } />
          <h3 data-testid="recipe-title">{ e.strMeal }</h3>
          <p data-testid="recipe-category">{ e.strCategory }</p>
          { filterMeals().map((el, index) => (
            <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              <li>{ el }</li>
            </ul>))}
          <p data-testid="instructions">{ e.strInstructions }</p>
          <iframe
            data-testid="video"
            src={ convertVideo(e.strYoutube) }
            title={ e.strMeal }
          />
        </div>
      ))}
    </>
  );
}
