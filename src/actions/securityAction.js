import axios from 'axios'
import JWTToken from '../security/JWTToken'
import jwt_decode from 'jwt-decode'
import {GET_ERRORS, SET_CURRENT_USER} from "./types";


export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("http://localhost:8080/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};


export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/api/users/login", LoginRequest);
        const {token} = res.data;
        localStorage.setItem("jwtToken", token);
        JWTToken(token);
        const decoded = jwt_decode(token);

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })
    } catch (e) {
        console.log(e);
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        });
    }
};


export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    JWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};