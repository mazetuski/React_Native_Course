import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import userReducer from './user';
import newsReducer from './news';
import gameReducer from './game';
import promiseMiddleware from 'redux-promise';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  userStore: userReducer,
  gameStore: gameReducer,
  newsStore: newsReducer,
});

export default createStore(
  rootReducer,
  composeEnchancers(applyMiddleware(promiseMiddleware)),
);
