import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import Reducer from "./reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)));