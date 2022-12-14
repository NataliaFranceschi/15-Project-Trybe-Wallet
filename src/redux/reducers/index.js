import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';

const rootReducers = combineReducers({
  wallet: walletReducer,
  user: userReducer,
});

export default rootReducers;
