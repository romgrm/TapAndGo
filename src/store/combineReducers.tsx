import { combineReducers } from 'redux';
import { counterReducer } from './reducer';
import stationReducer from './stations/reducerStation'


export const rootReducer = combineReducers({
  counter: counterReducer,
  stations: stationReducer
});

export type RootState = ReturnType<typeof rootReducer>;