import { createStore, combineReducers } from 'redux'
import {reducer as geohashReducer} from './geohash.js'
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  combineReducers({
    geohash: geohashReducer,
  }), 
  composeWithDevTools()
)