import React, {Component} from 'react';
import {connect} from "react-redux";
import {createStrategy, getStrategy} from "../actions/strategyAction";
import classnames from "classnames";

class EditStrategy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            optionType: "X",
            longOption: "",
            longStrike: "",
            longDate: "",
            longPrice: "",
            longQuantity: "",
            longExpireDateOption: "",
            shortOption: "",
            shortStrike: "",
            shortDate: "",
            shortPrice: "",
            shortQuantity: "",
            shortExpireDateOption: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        // this.props.getStrategy(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            console.log(nextProps.errors + '  ssss');
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const strategy = {
            id: this.state.id,
            name: this.state.name,
            optionType: this.state.optionType,

            longOption: this.state.longOption,
            longStrike: this.state.longStrike,
            longDate: this.state.longDate,
            longPrice: this.state.longPrice,
            longQuantity: this.state.longQuantity,
            longExpireDateOption: this.state.longExpireDateOption,

            shortOption: this.state.shortOption,
            shortStrike: this.state.shortStrike,
            shortDate: this.state.shortDate,
            shortPrice: this.state.shortPrice,
            shortQuantity: this.state.shortQuantity,
            shortExpireDateOption: this.state.shortExpireDateOption

        };
        console.log('submit = ' + strategy);
        this.props.createStrategy(strategy, this.props.history);
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="container">
                <br/>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Cadastro Estratégia</li>
                    </ol>
                </nav>
                <br/>

                <form onSubmit={this.onSubmit}>

                    <fieldset className="form-group">
                        <legend>Estratégia</legend>
                        <div className="form-group form-row">
                            <div className="form-group offset-md-2 col">
                                <label className="col-form-label sr-only" htmlFor="name">Nome</label>
                                <input className={classnames("form-control form-control-md", {
                                    "is-invalid": errors.name
                                })}
                                       value={this.state.name} onChange={this.onChange}
                                       type="text" name="name" placeholder="Nome"/>
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                            </div>

                            <div className="form-group col">
                                <select
                                    className="form-control form-control-md"
                                    name="optionType"
                                    value={this.state.optionType}
                                    onChange={this.onChange}>

                                    <option value="X">Tipo</option>
                                    <option value="CALL">CALL</option>
                                    <option value="PUT">PUT</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="form-group">
                        <legend>Comprado</legend>

                        <div className="form-group form-row">
                            <div className="form-group offset-md-2 col">
                                <label className="col-form-label sr-only" htmlFor="longOption">Opçao</label>
                                <input className="form-control"
                                       value={this.state.longOption} onChange={this.onChange}
                                       type="text" name="longOption" placeholder="opcao"/>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="longStrike">strike</label>
                                <input className="form-control"
                                       value={this.state.longStrike} onChange={this.onChange}
                                       type="text" name="longStrike" placeholder="strike"/>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="longDate">data</label>
                                <input className="form-control"
                                       value={this.state.longDate} onChange={this.onChange}
                                       type="text" name="longDate" placeholder="data"/>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="longQuantity">quantidade</label>
                                <input className="form-control"
                                       value={this.state.longQuantity} onChange={this.onChange}
                                       type="text" name="longQuantity" placeholder="quantidade"/>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="longPrice">valor</label>
                                <input className="form-control"
                                       value={this.state.longPrice} onChange={this.onChange}
                                       type="text" name="longPrice" placeholder="valor"/>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="form-group">
                        <legend>Vendido</legend>

                        <div className="form-group form-row">
                            <div className="form-group offset-md-2 col">
                                <label className="col-form-label sr-only" htmlFor="shortOption">Opçao</label>
                                <input className="form-control"
                                       value={this.state.shortOption} onChange={this.onChange}
                                       type="text" name="shortOption" placeholder="opcao"/>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="shortStrike">strike</label>
                                <input className="form-control"
                                       value={this.state.shortStrike} onChange={this.onChange}
                                       type="text" name="shortStrike" placeholder="strike"/>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="shortDate">shortdata</label>
                                <input className="form-control"
                                       value={this.state.shortDate} onChange={this.onChange}
                                       type="text" name="shortDate" placeholder="data"/>
                            </div>


                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="shortQuantity">quantidade</label>
                                <input className="form-control"
                                       value={this.state.shortQuantity} onChange={this.onChange}
                                       type="text" name="shortQuantity" placeholder="Quantidade"/>
                            </div>


                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="shortPrice">shortPrice</label>
                                <input className="form-control"
                                       value={this.state.shortPrice} onChange={this.onChange}
                                       type="text" name="shortPrice" placeholder="valor"/>
                            </div>


                        </div>

                        <div className="form-group row">
                            <div className="offset-md-2 col-auto">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">xxxx</label>
                            </div>

                        </div>
                        <div className="form-group row">
                            <div className="offset-md-2 col-auto">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </div>

                    </fieldset>


                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    strategy: state.strategy,
    errors: state.errors
});

export default connect(mapStateToProps, {createStrategy, getStrategy})(EditStrategy);