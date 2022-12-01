import { HANDLE_SEARCHBAR } from '../actions';

const INITIAL_STATE = {
  search: '',
};

const searchbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_SEARCHBAR:
    return {
      ...state,
      search: action.payload,
    };
  default:
    return state;
  }
};

export default searchbarReducer;
