import { createStore, combineReducers } from 'redux';
import { rootReducer } from '../reducers';
import { firebaseReducer } from 'react-redux-firebase';

export const store = createStore(
  combineReducers({
    root: rootReducer,
    firebase: firebaseReducer
  })
);