import { ADD_EXPENSE, DELETE_EXPENSE, GET_CURRENCIES, EDIT_EXPENSE,
  GET_CURRENCIES_SUCCESS, GET_CURRENCIES_FAILURE } from '../actions';

const initialState = {
  currencies: [],
  error: null,
  loading: false,
  dataAPI: {},
  expenses: [],
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
      currencies: Object.keys(action.data),
      dataAPI: action.data,
      error: null,
      loading: false,
    };
  case GET_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: (state.expenses
        .filter((expense) => expense.id !== Number(action.value))),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          Object.assign(expense, action.payload);
          return expense;
        }
        return expense;
      }),
    };
  default:
    return state;
  }
}

export default walletReducer;
