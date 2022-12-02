import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import RecipeDetails from './RecipeDetails';

const rootReducer = combineReducers({ SearchReducer, RecipeDetails });

export default rootReducer;
