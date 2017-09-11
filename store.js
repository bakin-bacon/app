import { createStore, applyMiddleware } from 'redux';
import getRootReducer from './reducers'

import thunk from 'redux-thunk';

export default function getStore(navReducer) {
  const store = createStore(
    getRootReducer(navReducer),
    applyMiddleware(thunk)
  );

  return store;
}