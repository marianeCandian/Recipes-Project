import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Recipes() {
  const [recipes, setRecipes] = useState('');
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const {
      location: { pathname },
    } = history;
    const fetchRecipes = async () => {
      try {
        if (pathname === '/meals') {
          const mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
          const response = await fetch(mealUrl);
          const data = await response.json();
          const maxIndex = 12;
          const result = data.meals.slice(0, maxIndex);
          setRecipes(result);
          console.log(result);
          setLoading(false);
        } else if (pathname === '/drinks') {
          const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
          const response = await fetch(drinkUrl);
          const data = await response.json();
          const maxIndex = 12;
          const result = data.drinks.slice(0, maxIndex);
          setRecipes(result);
          console.log(result);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
    console.log(recipes);
    console.log(isLoading);
  }, []);

  console.log(recipes);
  const {
    location: { pathname },
  } = history;

  return (
    <>
      { pathname === '/meals'
        ? recipes.map((recipe, index) => (
          <div key={ index }>{recipe.strMeal}</div>
        ))
        : recipes.map((recipe, index) => (
          <div key={ index }>{recipe.strDrink}</div>
        ))}
    </>
  );
}
