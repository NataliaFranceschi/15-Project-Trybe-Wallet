export const ADD_EXPENSE = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSES';
export const USER = 'USER';

export const addExpense = (payload) => ({ type: ADD_EXPENSE, payload });

export const deleteExpense = (value) => ({ type: DELETE_EXPENSE, value });

export const user = (value) => ({ type: USER, value });

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAILURE = 'GET_CURRENCIES_FAILURE';

export const getCurrenciesSuccess = (data) => ({
  type: GET_CURRENCIES_SUCCESS,
  data,
});

export const getCurrenciesFailure = (error) => ({
  type: GET_CURRENCIES_FAILURE,
  error,
});

export const getCurrencies = () => ({
  type: GET_CURRENCIES,
});

export function fetchCurrenciesAPI() {
  return async (dispatch) => {
    dispatch(getCurrencies());
    try {
      const DATA_API = 'https://economia.awesomeapi.com.br/json/all';

      const response = await fetch(DATA_API);
      const data = await response.json();
      delete data.USDT;

      dispatch(getCurrenciesSuccess(data));
    } catch (e) {
      console.log(e);
      dispatch(getCurrenciesFailure(e.message));
    }
  };
}
