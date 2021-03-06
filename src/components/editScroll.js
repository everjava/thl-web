import React, {Component} from 'react';
import {connect} from "react-redux";
import {createScroll, getScroll} from "../actions/scrollAction";
import {getStrategy} from "../actions/strategyAction";

class EditScroll extends Component {

    constructor(props) {
        super(props);
        const {idStrategy} = this.props.match.params;

        this.state =
            {
                strategy: "",
                idStrategy: idStrategy,
                id: "",
                name: "",
                optionType: "",
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
                hedgeOption: "",
                hedgeStrike: "",
                hedgeDate: "",
                hedgePrice: "",
                hedgeQuantity: "",
                hedgeExpireDateOption: "",
                hedgeOptionType: ""
            };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const scroll = {
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
            shortExpireDateOption: this.state.shortExpireDateOption,
            hedge: {
                option: this.state.hedgeOption,
                strike: this.state.hedgeStrike,
                date: this.state.hedgeDate,
                price: this.state.hedgePrice,
                quantity: this.state.hedgeQuantity,
                expireDateOption: this.state.hedgeExpireDateOption,
                optionType: this.state.hedgeOptionType
            }
        };
        console.log('submit = ' + scroll);
        console.log('this.state.idStrategy = ' + this.state.idStrategy);

        this.props.createScroll(scroll, this.state.strategy.id, this.props.history);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        console.log('componentDidMount id === ' + id);
        this.props.getStrategy(id, this.props.history);//vai no backend
    }

    /**
     * só depois de add este metodo é que carregou dados no edit
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps id === ' + nextProps.strategy.id);
        const strategy = nextProps.strategy;
        this.setState({
            strategy
        })
    }

    render() {
        return (
            <div className="container">
                <br/>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Cadastro Rolagem</li>
                    </ol>
                </nav>
                <br/>

                <form onSubmit={this.onSubmit}>

                    <fieldset className="form-group">
                        <div className="form-group form-row">
                            <div className="form-group offset-md-2 col">
                                <h3>   {this.state.strategy.name} </h3>
                            </div>
                            <div className="form-group offset-md-2 col">
                                <h3>  {this.state.strategy.optionType} </h3>
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
                                       type="text" name="shortQuantity" placeholder="quantidade"/>
                            </div>


                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="shortPrice">shortvalor</label>
                                <input className="form-control"
                                       value={this.state.shortPrice} onChange={this.onChange}
                                       type="text" name="shortPrice" placeholder="valor"/>
                            </div>

                        </div>

                        <div className="form-group row">

                            <div className="offset-md-2 col-auto">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Ativar defesa</label>
                            </div>

                        </div>
                        <div className="form-group row">
                            <div className="offset-md-2 col-auto">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </div>

                    </fieldset>

                    {/* adicionar um combo com opcoes de defesa e exibir para preenchimento */}
                    <fieldset className="form-group">
                        <legend>Defesa</legend>

                        <div className="form-group form-row">

                            <div className="form-group offset-md-2 col">
                                <label className="col-form-label sr-only" htmlFor="hedgeOption">Opçao</label>
                                <input className="form-control"
                                       value={this.state.hedgeOption} onChange={this.onChange}
                                       type="text" name="hedgeOption" placeholder="opcao"/>
                            </div>

                            <div className="form-group  col">
                                <select
                                    className="form-control "
                                    name="hedgeOptionType"
                                    value={this.state.hedgeOptionType}
                                    onChange={this.onChange}>

                                    <option value="X">Tipo</option>
                                    <option value="CALL">CALL</option>
                                    <option value="PUT">PUT</option>
                                </select>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="hedgeStrike">strike</label>
                                <input className="form-control"
                                       value={this.state.hedgeStrike} onChange={this.onChange}
                                       type="text" name="hedgeStrike" placeholder="strike"/>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="hedgeDate">shortdata</label>
                                <input className="form-control"
                                       value={this.state.hedgeDate} onChange={this.onChange}
                                       type="text" name="hedgeDate" placeholder="data"/>
                            </div>


                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="hedgeQuantity">quantidade</label>
                                <input className="form-control"
                                       value={this.state.hedgeQuantity} onChange={this.onChange}
                                       type="text" name="hedgeQuantity" placeholder="quantidade"/>
                            </div>


                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="hedgePrice">shortvalor</label>
                                <input className="form-control"
                                       value={this.state.hedgePrice} onChange={this.onChange}
                                       type="text" name="hedgePrice" placeholder="valor"/>
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
    strategy: state.strategy.strategy,
    scroll: state.scroll
});

export default connect(mapStateToProps, {getStrategy, createScroll, getScroll})(EditScroll);
