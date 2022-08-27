import { ADD_EXPENSES, DELETE_EXPENSES, GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS, GET_CURRENCIES_FAILURE } from '../actions';

const initialState = {
  currencies: [],
  error: null,
  loading: false,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      loding: true,
    };
  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.data,
      error: null,
      loading: false,
    };
  case GET_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  case ADD_EXPENSES:
    return [...state, action.data];
  case DELETE_EXPENSES:
    return state.filter((expense) => expense !== action.value);
  default:
    return state;
  }
}

export default walletReducer;
