import React, {Component} from 'react';
import moment from 'moment';
import numeral from 'numeral'
import Tooltip from "@material-ui/core/Tooltip";
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
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

    render() {
        //console.log('rowtable history = ' + JSON.stringify(this.props.history));

        const {scroll} = this.props;//scroll
        const {strategy} = this.props;
        const {showEdit} = this.props;

        let totalStrategy = (strategy.longPrice - strategy.shortPrice) * strategy.shortQuantity;
        let spread = scroll.shortPrice - scroll.longPrice;
        let scrollResult = spread * scroll.longQuantity;
        let rentabilidade = ((spread * scroll.longQuantity) / totalStrategy);
        RowsTable.sumResults += scrollResult;
        let retorno = totalStrategy - RowsTable.sumResults;

        const STYLES = {
            edit: {
                display: 'inline-block'
            }
        };

        return (
            <React.Fragment>
                <tr>
                    <td>{scroll.scrollNumber}</td>
                    <td>{scroll.longOption}</td>
                    <td>compra</td>
                    <td>{scroll.longStrike}</td>
                    <td>{moment(scroll.longDate).format('DD/MM/YYYY')}</td>
                    <td>{scroll.longQuantity}</td>
                    <td>${scroll.longPrice}</td>
                    <td>${scroll.longQuantity * scroll.longPrice}</td>

                    {/* Rolagem */}
                    <td rowSpan="2" className="align-middle">{numeral(spread).format('0.00')}</td>
                    {/* Resultado */}
                    <td rowSpan="2" className="align-middle">{numeral(scrollResult).format('0.00')}</td>
                    {/* Rentabilidade */}
                    <td rowSpan="2" className="align-middle">{numeral(rentabilidade).format('0.00%')}</td>
                    {/* Retorno */}
                    <td rowSpan="2"
                        className="align-middle">{numeral(scrollResult).format('0.00')} | {numeral(retorno).format('0.00')}</td>
                    {/* edit */}
                    <td rowSpan="2" className="align-bottom"  style={{display : showEdit}}>
                        <button className="btn btn-sm btn-danger" type="button" style={{display : showEdit}}
                                onClick={this.deleteScroll.bind(this, scroll.scrollNumber, strategy.id)}>
                            <Tooltip title="Deleta rolagem">
                                <RemoveCircleOutline fontSize="small"/>
                            </Tooltip>
                        </button>

                        <button className="btn btn-sm btn-info" type="button" style={{display : showEdit}}
                                onClick={this.getScroll.bind(this, scroll.scrollNumber, strategy.id)}>
                            <Tooltip title="Editar rolagem">
                                <EditIcon fontSize="small"/>
                            </Tooltip>
                        </button>
                    </td>

                </tr>
                <tr>
                    <td>{scroll.scrollNumber}</td>
                    <td>{scroll.shortOption}</td>
                    <td>venda</td>
                    <td>{scroll.shortStrike}</td>
                    <td>{moment(scroll.shortDate).format('DD/MM/YYYY')}</td>
                    <td>{scroll.shortQuantity}</td>
                    <td>${scroll.shortPrice}</td>
                    <td>${scroll.shortQuantity * scroll.shortPrice}</td>
                    {/* start merge */}

                </tr>
            </React.Fragment>
        );
    }
}

//export default RowsTable;
export default withRouter(connect(null, {deleteScroll, getScroll})(RowsTable))