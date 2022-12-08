import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

export default function Recipes() {
  const [mealsRecipes, setMealsRecipes] = useState('');
  const [mealsCategories, setMealsCategories] = useState();
  const [drinksRecipes, setDrinksRecipes] = useState('');
  const [drinksCategories, setDrinksCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const history = useHistory();

  const fetchCategories = async () => {
    const { location: { pathname } } = history;
    try {
      if (pathname === '/meals') {
        const mealCategoryUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(mealCategoryUrl);
        const data = await response.json();
        const maxIndex = 5;
        const result = data.meals.slice(0, maxIndex);
        setMealsCategories(result);
      } else if (pathname === '/drinks') {
        const drinkCategoryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(drinkCategoryUrl);
        const data = await response.json();
        const maxIndex = 5;
        const result = data.drinks.slice(0, maxIndex);
        setDrinksCategories(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const fetchBySelectedMealCategory = async ({ target: { value } }) => {
    const {
      location: { pathname },
    } = history;
    setSelectedCategory(value);
    if (selectedCategory === value) {
      fetchRecipes();
    } else if (pathname === '/meals') {
      const targetUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
      const response = await fetch(targetUrl);
      const data = await response.json();
      const maxIndex = 12;
      const result = data.meals.slice(0, maxIndex);
      setMealsRecipes(result);
    }
  };

  const fetchBySelectedDrinkCategory = async ({ target: { value } }) => {
    const {
      location: { pathname },
    } = history;
    setSelectedCategory(value);
    if (selectedCategory === value) {
      fetchRecipes();
    } else if (pathname === '/drinks') {
      const targetDrinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
      const response = await fetch(targetDrinkUrl);
      const data = await response.json();
      console.log(data);
      const maxIndex = 12;
      const result = data.drinks.slice(0, maxIndex);
      setDrinksRecipes(result);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {mealsCategories ? (
        mealsCategories.map((category, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            value={ category.strCategory }
            onClick={ fetchBySelectedMealCategory }
          >
            {category.strCategory}
          </button>
        ))
      ) : (
        <p />
      )}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ fetchRecipes }
      >
        All
      </button>
      {drinksCategories ? (
        drinksCategories.map((drinkCategory, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${drinkCategory.strCategory}-category-filter` }
            value={ drinkCategory.strCategory }
            onClick={ fetchBySelectedDrinkCategory }
          >
            {drinkCategory.strCategory}
          </button>
        ))
      ) : (
        <p />
      )}

      {mealsRecipes ? (
        mealsRecipes.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/meals/${recipe.idMeal}` }>
              <img
                src={ recipe.strMealThumb }
                alt={ `${recipe.strMeal} thumb` }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            </Link>
          </div>
        ))
      ) : (
        <p />
      )}
      {drinksRecipes ? (
        drinksRecipes.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/drinks/${recipe.idDrink}` }>
              <img
                src={ recipe.strDrinkThumb }
                alt={ `${recipe.strDrink} thumb` }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
            </Link>
          </div>
        ))
      ) : (
        <p />
      )}
    </>
  );
}
