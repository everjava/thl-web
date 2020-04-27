import React, {Component} from 'react';
import {connect} from "react-redux";
import {createNewUser} from "../../actions/securityAction";
class Register extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            fullName: this.state.fullName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        this.props.createNewUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <form  onSubmit={this.onSubmit} >
                    <img className="mb-4" src={process.env.PUBLIC_URL + "/jumbo.png"} alt="" width="170" height="92"/>

                    <label className="col-form-label sr-only" htmlFor="username">usuário</label>
                    <input type="email" name="username" className="form-control form-control-md"
                           placeholder="Email address" required autoFocus
                           value={this.state.username} onChange={this.onChange}/>

                    <label className="col-form-label sr-only" htmlFor="fullName">nome</label>
                    <input type="text" name="fullName" className="form-control form-control-md"
                           placeholder="Nome Completo" required autoFocus
                           value={this.state.fullName} onChange={this.onChange}/>

                    <label htmlFor="inputPassword" className="sr-only">Senha</label>
                    <input type="password" name="password" className="form-control form-control-md"
                           placeholder="Senha" required
                           value={this.state.password} onChange={this.onChange}/>

                    <label htmlFor="confirmPassword" className="sr-only">Confirmar Senha</label>
                    <input type="password" name="confirmPassword" className="form-control form-control-md"
                           placeholder="Confirmar Senha" required
                           value={this.state.confirmPassword} onChange={this.onChange}/>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Cadastrar</button>
                </form>
            </div>


        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {createNewUser}) (Register);