import { ADD_EXPENSES, DELETE_EXPENSES } from '../actions';

const initialState = [];

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return [...state, action.data];
  case DELETE_EXPENSES:
    return state.filter((expense) => expense !== action.value);
  default:
    return state;
  }
}

export default walletReducer;
