import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Recipes() {
  const [mealsRecipes, setMealsRecipes] = useState('');
  const [drinksRecipes, setDrinksRecipes] = useState('');
  const history = useHistory();

  const fetchRecipes = async () => {
    const {
      location: { pathname },
    } = history;
    try {
      if (pathname === '/meals') {
        const mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(mealUrl);
        const data = await response.json();
        const maxIndex = 12;
        const result = data.meals.slice(0, maxIndex);
        setMealsRecipes(result);
      } else if (pathname === '/drinks') {
        const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(drinkUrl);
        const data = await response.json();
        const maxIndex = 12;
        const result = data.drinks.slice(0, maxIndex);
        setDrinksRecipes(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  console.log(drinksRecipes);
  return (
    <>
      {mealsRecipes ? (
        mealsRecipes.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              alt={ `${recipe.strMeal} thumb` }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          </div>
        ))
      ) : (
        <p />
      )}
      {drinksRecipes ? (
        drinksRecipes.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strDrinkThumb }
              alt={ `${recipe.strDrink} thumb` }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
          </div>
        ))
      ) : (
        <p />
      )}
    </>
  );
}
