import React, {Component} from 'react';
import '../css/main.css'
import {getStrategy} from "../actions/strategyAction";
import {connect} from "react-redux";
import RowsTable from './rowsTable'


class ListStrategyScrolls extends Component {

    constructor() {
        super();
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
            scrollList: []
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getStrategy(id, this.props.history);//vai no backend
    }


    /**
     * static getDerivedStateFromProps()
     **/
    componentWillReceiveProps(nextProps) {

        const {
            id,
            name,
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
            shortExpireDateOption,
            scrollList
        } = nextProps.strategy;

        this.setState({
            id,
            name,
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
            shortExpireDateOption,
            scrollList
        });
    }

    render() {
        let scrolls = [];
        const strategy = this.state;
        if (typeof this.state.scrollList !== 'undefined' && this.state.scrollList !== null) {
            scrolls = this.state.scrollList;
        }

        const STYLES = {
            columnSize: {
                width: '5%'
            }
        };

        return (
            <div className="container">
                <div className="content" id="mission">

                    <br/>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Rolagens</li>
                        </ol>
                    </nav>
                    <br/>

                    <table className="table color2rows  table-responsive">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Opção</th>
                            <th scope="col">C/V</th>
                            <th scope="col">Strike</th>
                            <th scope="col">Data</th>
                            <th scope="col">Qtde</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Total</th>
                            <th scope="col">Spread</th>
                            <th scope="col">Resultado</th>
                            <th scope="col" style={STYLES.columnSize}>Rentabilidade</th>
                            <th scope="col">Retorno</th>

                        </tr>
                        </thead>
                        <tbody>
                        <RowsTable scroll={strategy} strategy={strategy} showEdit='none'/>
                        </tbody>
                    </table>


                    <table className="table border table-responsive">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Opção</th>
                            <th scope="col">C/V</th>
                            <th scope="col">Strike</th>
                            <th scope="col">Data</th>
                            <th scope="col">Qtde</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Total</th>

                            <th scope="col">Spread</th>
                            <th scope="col">Resultado</th>
                            <th scope="col">Rentabilidade</th>
                            <th scope="col">Retorno</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            scrolls.map(st => (
                                <RowsTable key={st.scrollNumber} scroll={st} strategy={strategy} showEdit='inline'/>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    strategy: state.strategy.strategy

});
export default connect(mapStateToProps, {getStrategy})(ListStrategyScrolls);