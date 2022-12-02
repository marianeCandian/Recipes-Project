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

  useEffect(() => {
    handleDispatch();
  }, []);

  return (
    <>
      { drinks
        && drinks.map((e, i) => (
          <div key={ i }>
            <img data-testid="recipe-photo" src={ e.strDrinkThumb } alt={ e.strDrink } />
            <h3 data-testid="recipe-title">{ e.strDrink }</h3>
            <p data-testid="recipe-category">{ e.strCategory }</p>
            <p data-testid={ `${i}-ingredient-name-and-measure` }>
              { e.strIngredient1 }
            </p>
            <p data-testid="instructions">{ e.strInstructions }</p>
          </div>
        ))}
      { meals
      && meals.map((e, i) => (
        <div key={ i }>
          <img
            width="300"
            height="200"
            data-testid="recipe-photo"
            src={ e.strMealThumb }
            alt={ e.strMeal }
          />
          <h3 data-testid="recipe-title">{ e.strMeal }</h3>
          <p data-testid="recipe-category">{ e.strCategory }</p>
          <p data-testid={ `${i}-ingredient-name-and-measure` }>
            { e.strIngredient1 }
          </p>
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
