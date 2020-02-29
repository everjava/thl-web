import React, {Component} from 'react';
//import moment from 'moment';
import numeral from 'numeral'
import Tooltip from "@material-ui/core/Tooltip";
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import WarningIcon from '@material-ui/icons/Warning';
import EditIcon from '@material-ui/icons/Edit';
import {deleteScroll, getScroll} from "../actions/scrollAction";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class RowsTable extends Component {

    constructor(props) {
        super(props);
    }

    deleteScroll(scrollNumber, idStrategy) {
        this.props.deleteScroll(scrollNumber, idStrategy, this.props.history);
    }

    getScroll(scrollNumber, idStrategy) {
        this.props.getScroll(scrollNumber, idStrategy, this.props.history);
    }

    static  sumResults = 0;
    static   custoTotal = 0;
    static rolagem = 0;

    render() {
        //console.log('rowtable history = ' + JSON.stringify(this.props.history));
        RowsTable.rolagem++;
        const {scroll} = this.props;//scroll
        const {strategy} = this.props;
        const {showEdit} = this.props;
        const {firstPosition} = this.props;
        // let  spread = scroll.shortPrice - scroll.longPrice;

        let  spread = 0;
        let scrollResult = 0;
        if(firstPosition){
            spread = scroll.longPrice - scroll.shortPrice;
            RowsTable.custoTotal = spread * scroll.longQuantity;
            scrollResult = spread * scroll.longQuantity;
        }else{
            spread = scroll.shortPrice - scroll.longPrice;
            scrollResult = spread * scroll.longQuantity;
            if (!scroll.hedge) {
                RowsTable.sumResults += scrollResult;
            }
        }

        let totalStrategy = (strategy.longPrice - strategy.shortPrice) * strategy.shortQuantity;
        //let scrollResult = spread * scroll.longQuantity;
        let rentabilidade = ((spread * scroll.longQuantity) / totalStrategy);
        let retornoo = 0;
        // retorno = custoTotal - (scrollResult)
        let scrollResult2 = firstPosition ? RowsTable.custoTotal : scrollResult;

        console.log('scrollResult antes ['+ RowsTable.rolagem+ '] = ' + scrollResult);
        if (scroll.hedge) {
            scrollResult += (scroll.hedge.price * scroll.hedge.quantity);
            RowsTable.sumResults += scrollResult;
            rentabilidade = scrollResult / RowsTable.custoTotal;
            console.log('hedge');
        }
        console.log('scrollResult depois ['+ RowsTable.rolagem+ '] = ' + scrollResult);

        retornoo =RowsTable.custoTotal - RowsTable.sumResults;

        const STYLES = {
            edit: {
                display: 'inline-block'
            },
            columnsize: {
                width: '16.66%'
            }
        };

        return (
            <React.Fragment>
                <tr>
                    <td>{scroll.scrollNumber}</td>
                    <td>{scroll.longOption}</td>
                    <td>compra</td>
                    <td>{scroll.longStrike}</td>
                    {/*  <td>{moment(scroll.longDate).format('DD/MM/YYYY')}</td>*/}
                    <td>{scroll.longDate}</td>
                    <td>{scroll.longQuantity}</td>
                    <td>${scroll.longPrice}</td>
                    <td>${scroll.longQuantity * scroll.longPrice}</td>

                    {/* Rolagem */}
                    <td rowSpan="2" className="align-middle">{numeral(spread).format('0.00')}</td>
                    {/* Resultado */}
                    <td rowSpan="2" className="align-middle">{numeral(scrollResult).format('0.00')}</td>
                    {/* Rentabilidade % */}
                    <td rowSpan="2" className="align-middle">{numeral(rentabilidade).format('0.00%')}</td>
                    {/* Retorno */}
                    <td rowSpan="2"
                        className="align-middle">{numeral(scrollResult).format('0.00')} | {numeral(retornoo).format('0.00')}</td>
                    {/* edit */}
                    {(showEdit === 'inline') ? (
                        <td rowSpan="2" className="align-middle">
                            <button className="btn btn-sm btn-danger" type="button"
                                    onClick={this.deleteScroll.bind(this, scroll.scrollNumber, strategy.id)}>
                                <Tooltip title="Deleta rolagem">
                                    <RemoveCircleOutline fontSize="small"/>
                                </Tooltip>
                            </button>

                            <button className="btn btn-sm btn-info" type="button"
                                    onClick={this.getScroll.bind(this, scroll.scrollNumber, strategy.id)}>
                                <Tooltip title="Editar rolagem">
                                    <EditIcon fontSize="small"/>
                                </Tooltip>
                            </button>
                        </td>
                    ) : (
                        <span title="blank space for the starter strategy. <span> cannot appear as a child of <tr> :)"/>
                    )}


                </tr>
                <tr>
                    <td>{scroll.scrollNumber}</td>
                    <td>{scroll.shortOption}</td>
                    <td>venda</td>
                    <td>{scroll.shortStrike}</td>
                    <td>{scroll.shortDate}</td>
                    <td>{scroll.shortQuantity}</td>
                    <td>${scroll.shortPrice}</td>
                    <td>${scroll.shortQuantity * scroll.shortPrice}</td>
                    {/* start merge columns */}

                </tr>
            </React.Fragment>
        );
    }
}

//export default RowsTable;
export default withRouter(connect(null, {deleteScroll, getScroll})(RowsTable))