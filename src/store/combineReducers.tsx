import { combineReducers } from "redux";
import stationReducer from "./stations/reducerStation";

export const rootReducer = combineReducers({
  stations: stationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
