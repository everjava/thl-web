import {combineReducers} from "redux";
import scrollReducer from "./scrollReducer";
import strategyReducer from "./strategyReducer";
import hedgeReducer from "./hedgeReducer";
import errorReducer from "./errorReducer";


export default combineReducers({
   // hedge: hedgeReducer,
    scroll: scrollReducer,
    strategy: strategyReducer,
    errors: errorReducer
});
