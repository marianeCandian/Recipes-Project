import { combineReducers } from 'redux';
import SearchReducer from './SearchReducer';
import DetailsReducer from './DetailsReducer';

const rootReducer = combineReducers({ SearchReducer, DetailsReducer });

export default rootReducer;
