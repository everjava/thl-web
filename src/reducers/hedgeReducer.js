import {DELETE_HEDGE, GET_HEDGE, GET_HEDGE_LIST} from "../actions/types";

const initialState = {
    hedgeList: [],
    hedge: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_HEDGE_LIST :
            return {
                ...state,
                hedgeList: action.payload
            };

        case GET_HEDGE :
            return {
                ...state,
                hedge: action.payload
            };

        case DELETE_HEDGE:
            return {
                ...state,
                hedgeList: state.hedgeList.filter(
                    hedge => hedge.id !== action.payload
                )
            };

        default :
            return state
    }
}