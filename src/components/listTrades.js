import React, {Component} from 'react';
import '../css/main.css'
import {getTrades} from '../actions/tradeAction'
import {getScrollList} from "../actions/scrollAction";
import {getStrategyList} from "../actions/strategyAction"
import {connect} from 'react-redux'
import TableRow from "./tableRow";

class ListTrades extends Component {

    componentDidMount() {
        this.props.getTrades();
        this.props.getScrollList();
        this.props.getStrategyList();

    }

    render() {


        const {strategyList} = this.props.strategy;


        return (
            <div className="container">
                <div className="content" id="mission">
                    <table className="table   table-responsive   ">
                        <thead>
                        <tr>
                            <th scope="col">Opção</th>
                            <th scope="col">Compra/Venda</th>
                            <th scope="col">Strike</th>
                            <th scope="col">Data</th>
                            <th scope="col">Qtde</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Total</th>
                            <th scope="col">Rolagem</th>
                            <th scope="col">Resultado</th>
                            <th scope="col">Rentabilidade</th>
                            <th scope="col">Retorno</th>
                            <th scope="col">f</th>
                        </tr>
                        </thead>
                        <tbody>

                        {/*                        {strategyList.map(strategy=>(
                            <TableRow  key={strategy.id} item={strategy}  />
                        ))}*/}

                        {/*{strategyList.map(strategy => (*/}
                        {/*    strategy.scrolls.map(st => (*/}
                        {/*            st.trades.map(trade => (*/}
                        {/*                <TableRow key={st.scrollNumber} item={trade} />*/}
                        {/*            ))*/}
                        {/*        ))*/}
                        {/*))}*/}
                        {strategyList.map(strategy => (
                            strategy.scrolls.sort((a, b) => a.item.scrollNumber > b.item.scrollNumber).map(st => (

                                <TableRow key={st.scrollNumber} scroll={st} strategy={strategy}/>

                            ))
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    trade: state.trade,
    scroll: state.scroll,
    strategy: state.strategy
});
export default connect(mapStateToProps, {getTrades, getScrollList, getStrategyList})(ListTrades);
