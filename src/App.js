import React, {Component} from 'react';
import './App.css';

import store from './store'
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from "./components/layout/menu";

import ListStrategy from './components/listStrategy'
import ListStrategyScrolls from './components/listStrategyScrolls'
import EditStrategy from "./components/editStrategy";
import UpdateStrategy from './components/updateStrategy'
import EditScroll from "./components/editScroll";
import UpdateScroll from "./components/updateScroll";
import Login from "./components/login/login";
import Register from "./components/login/register";

import jwt_decode from "jwt-decode";
import JWTToken from "./security/JWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityAction"
import SecuredRoute from "./security/SecureRoute";


const jwtToken = localStorage.jwtToken;
if (jwtToken) {
    JWTToken(jwtToken);
    const decoded_jwtToken = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_jwtToken
    });

    //https://github.com/auth0/jwt-decode/issues/53
    const currentTime = Date.now() / 1000;
    if (decoded_jwtToken.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/login";
    }
}


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="container">
                        <Menu/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>

                        <Switch>

                            <SecuredRoute exact path='/listStrategy' component={ListStrategy}/>
                            <SecuredRoute exact path='/listStrategyScrolls/:id' component={ListStrategyScrolls}/>
                            <SecuredRoute exact path='/editStrategy' component={EditStrategy}/>
                            <SecuredRoute exact path='/editStrategy/:id' component={EditStrategy}/>
                            <SecuredRoute exact path='/updateStrategy/:id' component={UpdateStrategy}/>

                            <SecuredRoute exact path='/editScroll/:id' component={EditScroll}/>
                            <SecuredRoute exact path='/updateScroll/:scrollNumber/:idStrategy'
                                          component={UpdateScroll}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;