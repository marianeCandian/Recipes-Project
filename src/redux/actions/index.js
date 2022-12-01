export const HANDLE_SEARCHBAR = 'HANDLE_SEARCHBAR';

export const handleSearchbar = (payload) => ({ type: HANDLE_SEARCHBAR, payload });

export const fetchWithFilterMeals = (filtro, procura) => async (dispatch) => {
  const filterIngredient = (`https://www.themealdb.com/api/json/v1/1/filter.php?${filtro}${procura}`);
  const filterName = (`https://www.themealdb.com/api/json/v1/1/search.php?${filtro}${procura}`);
  const URL = filtro === 'i=' ? filterIngredient : filterName;
  const response = await fetch(URL);
  const data = await response.json();
  return dispatch(handleSearchbar(data));
};

export const fetchWithFilterDrinks = (filtro, procura) => async (dispatch) => {
  const filterIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filtro}${procura}`;
  const filterName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${filtro}${procura}`;
  const URL = filtro === 'i=' ? filterIngredient : filterName;
  const response = await fetch(URL);
  const data = await response.json();
  return dispatch(handleSearchbar(data));
};
