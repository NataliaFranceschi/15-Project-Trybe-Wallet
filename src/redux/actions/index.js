export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const USER = 'USER';

export const addExpenses = (value) => ({ type: ADD_EXPENSES, data: value });

export const deleteExpenses = (value) => ({ type: DELETE_EXPENSES, value });

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
      const object = Object.keys(data);
      const result = object.filter((currency) => currency !== 'USDT');

      dispatch(getCurrenciesSuccess(result));
    } catch (e) {
      console.log(e);
      dispatch(getCurrenciesFailure(e.message));
    }
  };
}
