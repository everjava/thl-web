import React, {Component} from 'react';
import moment from 'moment';
import numeral from 'numeral'

class TableRow extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const {strategy} = this.props;

        console.log('strategy = ' + strategy);
    }

    static  sumResults = 0;

    render() {

        const {scroll} = this.props;//scroll
        const {strategy} = this.props;

        let totalStrategy = 0;
        let rolagem = 0;
        let scrollResult = 0;
        let rentabilidade = 0;
        let retorno = 0;

        //to avoid undefined trades[].valor
        if (this.props && this.props.scroll.scrollNumber) {

            totalStrategy = (strategy.longPosition.valor - strategy.shortPosition.valor) * strategy.shortPosition.qtde;
            rolagem = scroll.trades[1].valor - scroll.trades[0].valor;
            scrollResult = rolagem * scroll.trades[0].qtde;
            rentabilidade = ((rolagem * scroll.trades[0].qtde) / totalStrategy);
            TableRow.sumResults += scrollResult;
            retorno = totalStrategy - TableRow.sumResults;


            return (
                <React.Fragment>
                    <tr>
                        <th scope="row">{scroll.trades[0].opcao}:{scroll.scrollNumber}</th>
                        <td>{scroll.trades[0].compraVenda}</td>
                        <td>{scroll.trades[0].strike}</td>
                        <td>{moment(scroll.trades[0].data).format('DD/MM/YYYY')}</td>
                        <td>{scroll.trades[0].qtde}</td>
                        <td>${scroll.trades[0].valor}</td>
                        <td>${scroll.trades[0].qtde * scroll.trades[0].valor}</td>

                        {/* Rolagem */}
                        <td rowSpan="2" className="align-middle">{numeral(rolagem).format('0.00')}</td>
                        {/* Resultado */}
                        <td rowSpan="2" className="align-middle">{numeral(scrollResult).format('0.00')}</td>
                        {/* Rentabilidade */}
                        <td rowSpan="2" className="align-middle">{numeral(rentabilidade).format('0.00%')}</td>
                        {/* Retorno */}
                        <td rowSpan="2"
                            className="align-middle">{numeral(scrollResult).format('0.00')} | {numeral(retorno).format('0.00')}</td>
                        {/* edit */}
                        <td rowSpan="2" className="align-middle">edit</td>

                    </tr>
                    <tr>
                        <th scope="row">{scroll.trades[1].opcao}:{scroll.scrollNumber}</th>
                        <td>{scroll.trades[1].compraVenda}</td>
                        <td>{scroll.trades[1].strike}</td>
                        <td>{moment(scroll.trades[1].data).format('DD/MM/YYYY')}</td>
                        <td>{scroll.trades[1].qtde}</td>
                        <td>${scroll.trades[1].valor}</td>
                        <td>${scroll.trades[1].qtde * scroll.trades[1].valor}</td>
                        {/* start merge */}
                    </tr>
                </React.Fragment>
            );
        } else {
            return (<React.Fragment/>);
        }
    }
}

export default TableRow;