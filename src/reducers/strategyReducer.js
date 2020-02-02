import {DELETE_STRATEGY, GET_STRATEGY, GET_STRATEGY_LIST} from "../actions/types";

const initialState = {
    strategyList: [],
    strategy: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STRATEGY_LIST :
            return {
                ...state,
                strategyList: action.payload
            };

        case GET_STRATEGY :
            return {
                ...state,
                strategy: action.payload
            };

        case DELETE_STRATEGY:
            return {
                ...state,
                strategyList: state.strategyList.filter(
                    strategy => strategy.id !== action.payload
                )
            };

        default :
            return state
    }
}