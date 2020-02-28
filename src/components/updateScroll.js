import React, {Component} from 'react';
import {connect} from "react-redux";
import {createScroll, getScroll, updateScroll} from "../actions/scrollAction";
import {getStrategy} from "../actions/strategyAction";
import _ from 'lodash'

class UpdateScroll extends Component {

    constructor(props) {
        super(props);
        const {idStrategy} = this.props.match.params;

        this.state =
            {
                strategy: "",
                scrollNumber: "",
                id: "",
                name: "",
                optionType: "",
                longOption: '',
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
                hedgeOptionType: "",
                hedge: {}
            };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        let name =e.target.name;
        let value =e.target.value;
        let nestedJson = this.state.hedge;
        nestedJson = _.set(nestedJson, name, value);
        this.setState({nestedJson})
    }

    onSubmit(e) {
        e.preventDefault();
        const scroll = {
            id: this.state.id,
            // name: this.state.name,
            // optionType: this.state.optionType,
            scrollNumber: this.state.scrollNumber,
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
                option: this.state.hedge.option,
                strike: this.state.hedge.strike,
                date: this.state.hedge.date,
                price: this.state.hedge.price,
                quantity: this.state.hedge.quantity,
                expireDateOption: this.state.hedge.expireDateOption,
                optionType: this.state.hedge.optionType
            }
        };
        this.props.updateScroll(scroll, this.state.strategy.id, this.props.history);
    }

    componentDidMount() {
        const {idStrategy} = this.props.match.params;
        const {scrollNumber} = this.props.match.params;
        this.props.getScroll(scrollNumber, idStrategy, this.props.history);
        this.props.getStrategy(idStrategy, this.props.history);//vai no backend
        console.log('componentDidMount');
    }

    /**
     * só depois de add este metodo é que carregou dados no edit
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        const strategy = nextProps.strategy;
        const hedge = nextProps.scroll.hedge ?  nextProps.scroll.hedge : '';
        const {
            scrollNumber,
            optionType,
            longOption,
            longStrike,
            longDate,
            longPrice,
            longQuantity,
            longExpireDateOption,
            shortOption,
            shortStrike,
            shortDate,
            shortPrice,
            shortQuantity,
            shortExpireDateOption
        } = nextProps.scroll;

        // A component is changing an uncontrolled input of type text to be controlled
        //https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro

        this.setState({
            ...this.state,
            strategy,
            scrollNumber,
            optionType,
            longOption,
            longStrike,
            longDate,
            longPrice,
            longQuantity,
            longExpireDateOption,
            shortOption,
            shortStrike,
            shortDate,
            shortPrice,
            shortQuantity,
            shortExpireDateOption
            , hedge
        });
    }

    render() {

        console.log(this.state.hedge);

        if (!this.state.longOption ) {
            return null;
        }

        return (
            <div className="container">
                <br/>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Edição Rolagem</li>
                    </ol>
                </nav>
                <br/>

                <form onSubmit={this.onSubmit}>

                    <fieldset className="form-group">
                        <div className="form-group form-row">
                            <div className="form-group offset-md-2 col">
                                <h3>    {this.state.strategy.name} </h3>
                            </div>
                            <div className="form-group offset-md-2 col">
                                <h3>   {this.state.strategy.optionType} </h3>
                            </div>
                            <div className="form-group offset-md-2 col">
                                <h3>   {this.state.scrollNumber} </h3>
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
                                <input className="form-control" data-date="" data-date-format="DD-MM-YYYY"
                                       value={this.state.shortDate}
                                       onChange={this.onChange}
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
                                <label className="form-check-label" htmlFor="exampleCheck1">xxxx</label>
                            </div>

                        </div>
                        <div className="form-group row">
                            <div className="offset-md-2 col-auto">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </div>

                    </fieldset>


                    <fieldset className="form-group">
                        <legend>Defesa</legend>

                        <div className="form-group form-row">

                            <div className="form-group offset-md-2 col">
                                <label className="col-form-label sr-only" htmlFor="option">Opçao</label>
                                <input className="form-control"
                                       value={this.state.hedge.option} onChange={this.onChange}
                                       type="text" name="option" placeholder="opcao"/>
                            </div>

                            <div className="form-group  col">
                                <select
                                    className="form-control "
                                    name="optionType"
                                    value={this.state.hedge.optionType}
                                    onChange={this.onChange}>

                                    <option value="X">Tipo</option>
                                    <option value="CALL">CALL</option>
                                    <option value="PUT">PUT</option>
                                </select>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="strike">strike</label>
                                <input className="form-control"
                                       value={this.state.hedge.strike} onChange={this.onChange}
                                       type="text" name="strike" placeholder="strike"/>
                            </div>

                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="date">shortdata</label>
                                <input className="form-control"
                                       value={this.state.hedge.date} onChange={this.onChange}
                                       type="text" name="date" placeholder="data"/>
                            </div>


                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="quantity">quantidade</label>
                                <input className="form-control"
                                       value={this.state.hedge.quantity} onChange={this.onChange}
                                       type="text" name="quantity" placeholder="quantidade"/>
                            </div>


                            <div className="form-group col">
                                <label className="col-form-label sr-only" htmlFor="price">shortvalor</label>
                                <input className="form-control"
                                       value={this.state.hedge.price} onChange={this.onChange}
                                       type="text" name="price" placeholder="valor"/>
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
    scroll: state.scroll.scroll
    , hedge: state.scroll.hedge
});

export default connect(mapStateToProps, {getStrategy, createScroll, updateScroll, getScroll})(UpdateScroll);
