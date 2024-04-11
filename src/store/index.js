import { createStore } from 'redux';
import graphReducer from './reducer';

export const store = createStore(
  graphReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
