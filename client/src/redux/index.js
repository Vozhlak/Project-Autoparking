import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { dateReducer } from './dateReducer';
import { parkingReducer } from './parkingReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  parking: parkingReducer,
  date: dateReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));