import React, {Component} from 'react';
import {connect} from "react-redux";
import {logout} from "../../actions/securityAction";
import {Link} from "react-router-dom";

class Menu extends Component {

    logout() {
        this.props.logout();
        window.location.href = "/login";
    }

    render() {
        const {validToken, user} = this.props.security;

        const isUserAuthenticated = (

            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="/listStrategy">Estrategias</a></li>
                    <li className="nav-item"><a className="nav-link" href="/editStrategy">Cadastro</a></li>

                    <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                    <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/logout" onClick={this.logout.bind(this)}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        );

        const isUserNotAuthenticated = (
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                    <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
                </ul>
            </div>

        );

        let headerLinks;

        if (validToken && user) {
            headerLinks = isUserAuthenticated;
            console.log('true');
        } else {
            headerLinks = isUserNotAuthenticated;
            console.log('false');
        }


        return (
            <nav id="navbar-site" className="fixed-top navbar navbar-dark bg-dark navbar-expand-sm">
                {headerLinks}
            </nav>

        );
    }
}

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps, {logout})(Menu)
