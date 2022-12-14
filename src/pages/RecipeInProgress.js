import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchRecipesMeals, fetchRecipesDrinks } from '../redux/actions';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../RecipeInProgress.css';

function RecipeInProgress() {
  const history = useHistory();
  const [check] = useState([]);
  const [length, setLength] = useState(0);
  const [favoriteBtn, setFavoriteBtn] = useState(true);

  const [finishBtn, setFinishBtn] = useState(true);
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(true);
  const meals = useSelector((state) => state.DetailsReducer.details.meals);
  const drinks = useSelector((state) => state.DetailsReducer.details.drinks);
  const { location: { pathname } } = history;

  const handleDispatch = () => {
    const id = pathname.split('/');
    if (pathname.includes('/meals')) {
      dispatch(fetchRecipesMeals(id[2]));
    } else if (pathname.includes('/drinks')) { dispatch(fetchRecipesDrinks(id[2])); }
  };
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

  const handleChange = ({ target }) => {
    const { id, name } = target;
    if (check.find((e) => e === id) !== undefined) {
      check.splice(id);
    } else {
      check.push(id);
    }
    if (check.length > 1) {
      if (name === 'Meals') {
        setLength(filterMeals().length);
      } else {
        setLength(filterDrinks().length);
      }
    }
    if (check.length === length) {
      setFinishBtn(false);
    }
    return localStorage.setItem('inProgressRecipes', JSON.stringify(check));
  };

  const buttonFavorite = () => {
    if (pathname.includes('meals')) {
      const saveLocalStorage = meals.map((e) => ({ id: e.idMeal,
        type: 'meal',
        nationality: e.strArea,
        category: e.strCategory,
        alcoholicOrNot: '',
        name: e.strMeal,
        image: e.strMealThumb }));
      if (favoriteBtn) {
        const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const salve = [...storage, saveLocalStorage[0]];
        localStorage.setItem('favoriteRecipes', JSON.stringify(salve));
        setFavoriteBtn(false);
      } else {
        const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const remove = storage.filter((e) => e.id !== saveLocalStorage[0].id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
        setFavoriteBtn(true);
      }
    } else if (pathname.includes('drinks')) {
      const saveLocalStorage = drinks.map((e) => ({ id: e.idDrink,
        type: 'drink',
        nationality: '',
        category: e.strCategory,
        alcoholicOrNot: e.strAlcoholic,
        name: e.strDrink,
        image: e.strDrinkThumb }));
      if (favoriteBtn) {
        const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const salve = [...storage, saveLocalStorage[0]];
        localStorage.setItem('favoriteRecipes', JSON.stringify(salve));
        setFavoriteBtn(false);
      } else {
        const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const remove = storage.filter((e) => e.id !== saveLocalStorage[0].id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
        setFavoriteBtn(true);
      }
    }
  };

  const verifyCheck = (index) => check.some(
    (element) => element === JSON.stringify(index),
  );

  const buttonShareIcon = () => {
    if (copied) {
      setCopied(false);
    }
    const route = pathname.split('/');
    console.log(route);
    copy(`http://localhost:3000/${route[1]}/${route[2]}`);
  };

  // const verifyKeyLocalStorage = () => {
  //   const id = pathname.split('/');
  //   const keyInProgressRecipes = localStorage.getItem('inProgressRecipes');
  //   if (keyInProgressRecipes === null) {
  //     setVerifyLocalStorage(true);
  //   } else if (keyInProgressRecipes.includes(id[2])) { setVerifyLocalStorage(false); }
  // };

  useEffect(() => {
    const storage = localStorage.getItem('favoriteRecipes');
    if (!storage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else if (storage !== null && storage !== undefined && storage.length > 0) {
      const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteBtn(local.some((e) => e.id.includes(pathname)));
    }
    const arrayStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (arrayStorage !== null) {
      check.push(arrayStorage);
    }
    handleDispatch();
  }, []);

  return (
    <>
      <p>Recipes In Progress</p>
      <p />
      <button type="button" onClick={ buttonShareIcon }>
        <img data-testid="share-btn" src={ shareIcon } alt="Share" />
      </button>
      { copied ? <span /> : <p>Link copied!</p>}
      <button type="button" onClick={ buttonFavorite }>
        <img
          data-testid="favorite-btn"
          src={ favoriteBtn ? whiteHeartIcon : blackHeartIcon }
          alt="Favorite"
        />
      </button>
      { drinks && drinks.map((e, i) => (
        <div key={ i }>
          <img
            data-testid="recipe-photo"
            src={ e.strDrinkThumb }
            alt={ e.strDrink }
            className="imgRecipes"
          />
          <h3 data-testid="recipe-title">{ e.strDrink }</h3>
          <p data-testid="recipe-category">{ e.strAlcoholic }</p>
          <h4>Ingredients</h4>
          <fieldset>
            <ul className="ingredient" data-testid="ingredient-step">
              { filterDrinks().map((el, index) => (
                <li key={ `ingredient${index}` }>
                  <label className="ingredient" htmlFor={ `ingredient-${index}` }>
                    <input
                      name="Drinks"
                      id={ index }
                      data-testid={ `${index}-ingredient-step` }
                      type="checkbox"
                      checked={ verifyCheck(index) }
                      onChange={ handleChange }
                    />
                    <span>{ el }</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          <h4>Instructions</h4>
          <fieldset data-testid="instructions">{ e.strInstructions }</fieldset>
        </div>))}
      { meals && meals.map((e, i) => (
        <div key={ i }>
          <img
            data-testid="recipe-photo"
            src={ e.strMealThumb }
            alt={ e.strMeal }
            className="imgRecipes"
          />
          <h3 data-testid="recipe-title">{ e.strMeal }</h3>
          <p data-testid="recipe-category">{ e.strCategory }</p>
          <h4>Ingredients</h4>
          <fieldset>
            <ul data-testid="ingredient-step" className="ingredient">
              {filterMeals().map((element, index) => (
                <li key={ `ingredient${index}` }>
                  <label
                    htmlFor={ `ingredient-${index}` }
                  >
                    <input
                      name="Meals"
                      data-testid={ `${index}-ingredient-step` }
                      type="checkbox"
                      id={ index }
                      checked={ check.find((ele) => ele === index) === index }
                      onChange={ handleChange }
                    />
                    <span>{ element }</span>

                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          <h4>Instructions</h4>
          <fieldset data-testid="instructions">{ e.strInstructions }</fieldset>
        </div>))}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="buttonFooter"
        disabled={ finishBtn }
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeInProgress;
