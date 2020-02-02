import axios from "axios";
import {GET_ERRORS, GET_STRATEGY, GET_STRATEGY_LIST} from "./types";

export const getStrategyList = () => async dispatch => {

    const res = await axios.get('http://localhost:8080/api/strategy/all');
    dispatch({
        type: GET_STRATEGY_LIST,
        payload: res.data
    });

};

export const getStrategy = (id, history) => async dispatch => {

    const res = await axios.get(`http://localhost:8080/api/strategy/find/${id}`);
    dispatch({
        type: GET_STRATEGY,
        payload: res.data
    });

};

export const getStrategyScroll = (scrollNumber, idStrategy, history) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/api/scroll/find/${scrollNumber}/${idStrategy}`);
    dispatch({
        type: GET_STRATEGY,
        payload: res.data
    });
};

export const createStrategy = (strategy, history) => async dispatch => {
    try {
        await axios.post("http://localhost:8080/api/strategy/save/", strategy);
        history.push("/listStrategy");
    } catch (e) {
        console.log('ERRO INSERT = ' + e);
    }
};


export const deleteStrategy = (id, history) => async dispatch => {
    try {
        if (window.confirm("Confirma exclusão ?")) {
            await axios.delete(`http://localhost:8080/api/strategy/delete/${id}`);
            const all = await axios.get('http://localhost:8080/api/strategy/all');
            history.push("/listStrategy");
            dispatch({
                type: GET_STRATEGY_LIST,
                payload: all.data
            });
        }
    }catch (e) {
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        });
    }

};