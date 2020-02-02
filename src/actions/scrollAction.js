import axios from "axios";
import {GET_ERRORS, GET_SCROLL, GET_SCROLL_LIST, GET_STRATEGY} from "./types";

export const getScrollList = () => async dispatch => {
    const res = await axios.get('http://localhost:8080/api/scroll/all/');
    dispatch({
        type: GET_SCROLL_LIST,
        payload: res.data
    });
};

//GET SCROLL BY NUMBER AND ID-STRATEGY
export const getScroll = (scrollNumber, idStrategy, history) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/api/scroll/find/${scrollNumber}/${idStrategy}`);

    history.push(`/updateScroll/${scrollNumber}/${idStrategy}`);

    dispatch({
        type: GET_SCROLL,
        payload: res.data
    });
};

export const createScroll = (scroll, idStrategy, history) => async dispatch => {
    try {
        console.log('scroll action = ' + idStrategy);
        await axios.post(`http://localhost:8080/api/scroll/save/${idStrategy}`, scroll);
        history.push("/listStrategy");
    } catch (e) {
        console.log('ERRO INSERT = ' + e);
    }
};

export const updateScroll = (scroll, idStrategy, history) => async dispatch => {
    try {
        console.log('scroll action = ' + idStrategy);
        const all = await axios.post(`http://localhost:8080/api/scroll/update/${idStrategy}`, scroll);
        history.push(`/listStrategyScrolls/${idStrategy}`);
        dispatch({
            type: GET_STRATEGY,
            payload: all.data
        });
    } catch (e) {
        console.log('ERRO INSERT = ' + e);
    }
};


export const deleteScroll = (scrollNumber, idStrategy, history) => async dispatch => {
    try {
        if (window.confirm("Confirma exclusão ?")) {
           const all = await axios.delete(`http://localhost:8080/api/strategy/scroll/delete/${scrollNumber}/${idStrategy}`);
           history.push(`/listStrategyScrolls/${idStrategy}`);
            dispatch({
                type: GET_STRATEGY,
                payload: all.data
            });
        }
    } catch (e) {
        console.log(e)
/*        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        });*/
    }
};
