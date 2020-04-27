import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

//https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
const SecuredRoute = ({component: Component, security, ...otherProps}) => (
    <Route
        {...otherProps}
        render={props =>
            security.validToken === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);

SecuredRoute.propTypes = {
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps)(SecuredRoute);