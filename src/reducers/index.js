import {combineReducers} from "redux";
import scrollReducer from "./scrollReducer";
import strategyReducer from "./strategyReducer";
import hedgeReducer from "./hedgeReducer";


export default combineReducers({
    hedge: hedgeReducer,
    scroll: scrollReducer,
    strategy: strategyReducer
});
