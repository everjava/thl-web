import {DELETE_SCROLL, GET_SCROLL, GET_SCROLL_LIST} from "../actions/types";

const initialState = {
    scrollList: [],
    scroll: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SCROLL_LIST :
            return {
                ...state,
                scrollList: action.payload
            };

        case GET_SCROLL  :
            return {
                ...state,
                scroll: action.payload
            };

        case DELETE_SCROLL:
            return {
                ...state,
                scrollList: state.scrollList.filter(
                    scroll => scroll.id !== action.payload
                )
            };

        default:
            return state;
    }
}

