import { RECIPE_DETAILS } from '../actions';

const INITIAL_STATE = {
  details: '',
};

const recipeDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPE_DETAILS:
    return {
      ...state,
      details: action.payload,
    };
  default:
    return state;
  }
};

export default recipeDetails;
