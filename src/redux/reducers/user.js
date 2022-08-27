import { USER } from '../actions';

const initialState = {};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case USER:
    return action.value;
  default:
    return state;
  }
}

export default userReducer;
