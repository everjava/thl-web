import axios from "axios";
import {GET_ERRORS, GET_HEDGE, GET_HEDGE_LIST} from "./types";

export const getHedgeList = () => async dispatch => {
    const res = await axios.get('http://localhost:8080/api/hedge/all/');
    dispatch({
        type: GET_HEDGE_LIST,
        payload: res.data
    });
};

export const getHedge = (id, history) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/api/hedge/find/${id}`);
    dispatch({
        type: GET_HEDGE,
        payload: res.data
    });
};

export const createHedge = (hedge, history) => async dispatch => {
    try {
        await axios.post("http://localhost:8080/api/hedge/save/", hedge);
        history.push("/listHedge");
    } catch (e) {
        console.log('ERRO INSERT = ' + e);
    }
};


export const deleteHedge = (id, history) => async dispatch => {
    try {
        if (window.confirm("Confirma exclusão ?")) {
            await axios.delete(`http://localhost:8080/api/hedge/delete/${id}`);
            const all = await axios.get('http://localhost:8080/api/hedge/all');
            history.push("/listHedge");
            dispatch({
                type: GET_HEDGE_LIST,
                payload: all.data
            });
        }
    } catch (e) {
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        });
    }
};
