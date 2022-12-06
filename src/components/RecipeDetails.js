import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchRecipesMeals, fetchRecipesDrinks } from '../redux/actions';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../RecipeDetails.css';

export default function RecipeDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.DetailsReducer.details.meals);
  const drinks = useSelector((state) => state.DetailsReducer.details.drinks);
  const [recomendationDrinks, setRecomendationDrinks] = useState();
  const [recomendationMeals, setRecomendationMeals] = useState();
  const [verifyLocalStorage, setVerifyLocalStorage] = useState(true);
  const [copyUrl, setCopyUrl] = useState('');
  const [copied, setCopied] = useState(true);

  const handleDispatch = () => {
    const { location: { pathname } } = history;
    const id = pathname.split('/');
    if (pathname.includes('/meals')) {
      dispatch(fetchRecipesMeals(id[2]));
    } else if (pathname.includes('/drinks')) {
      dispatch(fetchRecipesDrinks(id[2]));
    }
  };

  const convertVideo = (url) => url.replace('watch?v=', 'embed/');

  const filterMeals = () => {
    const magicNumber = 50;
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
    const magicNumber = 50;
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
    const magicNumber = 6;
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    const recomendation = data.meals.filter((_e, i) => i < magicNumber);
    setRecomendationMeals(recomendation);
    return data.meals;
  };

  const fetchRecommendationDrinks = async () => {
    const magicNumber = 6;
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    const recomendation = data.drinks.filter((_e, i) => i < magicNumber);
    setRecomendationDrinks(recomendation);
    return data.drinks;
  };

  const handleRecipeInProgress = () => {
    const { location: { pathname } } = history;
    const id = pathname.split('/');
    if (id.includes('meals')) {
      history.push(`/meals/${id[2]}/in-progress`);
    }
    if (id.includes('drinks')) {
      history.push(`/drinks/${id[2]}/in-progress`);
    }
  };

  const verifyKeyLocalStorage = () => {
    const { location: { pathname } } = history;
    const id = pathname.split('/');
    const keyInProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (keyInProgressRecipes === null) {
      setVerifyLocalStorage(true);
    } else if (keyInProgressRecipes.includes(id[2])) {
      setVerifyLocalStorage(false);
    }
  };

  const buttonShareIcon = () => {
    const { location: { pathname } } = history;
    setCopyUrl(pathname);
    if (copyUrl === pathname) {
      setCopied(false);
    } else {
      setCopied(true);
    }
    copy(`http://localhost:3000${pathname}`);
  };

  useEffect(() => {
    handleDispatch();
    fetchRecommendationMeals();
    fetchRecommendationDrinks();
    verifyKeyLocalStorage();
  }, []);

  useEffect(() => {
    buttonShareIcon();
  }, [copied]);

  return (
    <>
      { drinks
        && drinks.map((e, i) => (
          <div key={ i }>
            <img
              data-testid="recipe-photo"
              src={ e.strDrinkThumb }
              alt={ e.strDrink }
              className="imgRecipes"
            />
            <button type="button" onClick={ buttonShareIcon }>
              <img data-testid="share-btn" src={ shareIcon } alt="Share" />
            </button>
            { copied ? <span /> : <p>Link copied!</p>}
            <button type="button">
              <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="Favorite" />
            </button>
            <h3 data-testid="recipe-title">{ e.strDrink }</h3>
            <p data-testid="recipe-category">{ e.strAlcoholic }</p>
            <h4>Ingredients</h4>
            <fieldset>
              { filterDrinks().map((el, index) => (
                <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  <li>{ el }</li>
                </ul>
              ))}
            </fieldset>
            <h4>Instructions</h4>
            <fieldset data-testid="instructions">{ e.strInstructions }</fieldset>
            <h4>Recommended</h4>
            <section className="recommended">
              <div className="list">
                { recomendationMeals
                  && recomendationMeals.map((meal, ind) => (
                    <div
                      key={ ind }
                      data-testid={ `${ind}-recommendation-card` }
                      className="cards"
                    >
                      <img src={ meal.strMealThumb } alt={ meal.strMeal } />
                      <p data-testid={ `${ind}-recommendation-title` }>
                        { meal.strMeal }
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        ))}
      { meals
      && meals.map((e, i) => (
        <div key={ i }>
          <img
            data-testid="recipe-photo"
            src={ e.strMealThumb }
            alt={ e.strMeal }
            className="imgRecipes"
          />
          <button type="button" onClick={ buttonShareIcon }>
            <img data-testid="share-btn" src={ shareIcon } alt="Share" />
          </button>
          { copied ? <span /> : <p>Link copied!</p>}
          <button type="button">
            <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="Favorite" />
          </button>
          <h3 data-testid="recipe-title">{ e.strMeal }</h3>
          <p data-testid="recipe-category">{ e.strCategory }</p>
          <h4>Ingredients</h4>
          <fieldset>
            { filterMeals().map((el, index) => (
              <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                <li>{ el }</li>
              </ul>
            ))}
          </fieldset>
          <h4>Instructions</h4>
          <fieldset data-testid="instructions">{ e.strInstructions }</fieldset>
          <iframe
            data-testid="video"
            src={ convertVideo(e.strYoutube) }
            title={ e.strMeal }
          />
          <h4>Recommended</h4>
          <section className="recommended">
            <div className="list">
              { recomendationDrinks
              && recomendationDrinks.map((drink, ind) => (
                <div
                  key={ ind }
                  data-testid={ `${ind}-recommendation-card` }
                  className="cards"
                >
                  <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
                  <p data-testid={ `${ind}-recommendation-title` }>{ drink.strDrink }</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ))}
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleRecipeInProgress }
        className="buttonFooter"
      >
        { verifyLocalStorage ? 'Start Recipe' : 'Continue Recipe' }
      </button>
    </>
  );
}
