import React, {Component} from 'react';
import './App.css';

import store from './store'
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Menu from "./components/layout/menu";

import ListStrategy from './components/listStrategy'
import ListStrategyScrolls from './components/listStrategyScrolls'
import EditStrategy from "./components/editStrategy";
import UpdateStrategy from './components/updateStrategy'
import EditScroll from "./components/editScroll";
import UpdateScroll from "./components/updateScroll";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="container">
                        <Menu/>
                        <Route exact path='/listStrategy' component={ListStrategy}/>
                        <Route exact path='/listStrategyScrolls/:id' component={ListStrategyScrolls}/>
                        <Route exact path='/editStrategy' component={EditStrategy}/>
                        <Route exact path='/editStrategy/:id' component={EditStrategy}/>
                        <Route exact path='/updateStrategy/:id' component={UpdateStrategy}/>

                        <Route exact path='/editScroll/:id' component={EditScroll}/>
                        <Route exact path='/updateScroll/:scrollNumber/:idStrategy' component={UpdateScroll}/>

                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;