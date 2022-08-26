export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const LOGIN = 'LOGIN';

export const addExpenses = (value) => ({ type: ADD_EXPENSES, data: value });

export const deleteExpenses = (value) => ({ type: DELETE_EXPENSES, value });

export const login = (value) => ({ type: LOGIN, value });
