import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import { counterReducer } from "./reducer";
import stationReducer from "./stations/reducerStation";
import thunk from "redux-thunk";
import { rootReducer } from "./combineReducers";



const middleware = applyMiddleware(thunk);

const store = createStore(rootReducer, middleware);

export default store;
