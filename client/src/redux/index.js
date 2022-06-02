import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { dateReducer } from './dateReducer';
import { parkingReducer } from './parkingReducer';
import { userReducer } from './userReducer';
import { payReducer } from './payReducer';

const rootReducer = combineReducers({
  user: userReducer,
  parking: parkingReducer,
  date: dateReducer,
  dataPay: payReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));