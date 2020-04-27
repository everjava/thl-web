import React, {Component} from 'react';
import {login} from "../../actions/securityAction";
import {connect} from "react-redux";
import classnames from "classnames";
import '../../css/login.css'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/listStrategy");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.security.validToken) {
            this.props.history.push("/listStrategy");
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
        e.preventDefault();
        const LoginRequest = {
            username: this.state.username,
            password: this.state.password

        }
        this.props.login(LoginRequest);
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-signin">
                        <img className="mb-4" src={process.env.PUBLIC_URL + "/jumbo.png"} alt="" width="170"
                             height="92"/>

                        <label className="col-form-label sr-only" htmlFor="username">usuário</label>
                        <input type="email" name="username"
                               className={classnames("form-control form-control-md", {"is-invalid": errors.username})}
                               placeholder="Email address" required autoFocus
                               value={this.state.username} onChange={this.onChange}/>
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}

                        <label htmlFor="inputPassword" className="sr-only">Senha</label>
                        <input type="password" name="password"
                               className={classnames("form-control form-control-md", {"is-invalid": errors.password})}
                               placeholder="Senha" required
                               value={this.state.password} onChange={this.onChange}/>
                        {errors.username && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}


                        <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                        ev9@email.com
                    </div>
                </form>
            </div>


        );
    }
}

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, {login})(Login);