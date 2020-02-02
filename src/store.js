import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const middleware = [thunk];

let store = createStore(rootReducer,initialState, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
));

export default store;
