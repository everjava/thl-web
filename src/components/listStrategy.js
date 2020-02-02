import React, {Component} from 'react';
import '../css/main.css'
import {deleteStrategy, getStrategyList} from "../actions/strategyAction"
import {connect} from 'react-redux'
import moment from 'moment';
import {Link} from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Adicionar a data de vencimento da opcao na rolagem e estrategia
 */
class ListStrategy extends Component {

    componentDidMount() {
        this.props.getStrategyList();
    }

    deleteStrategy(id) {
        this.props.deleteStrategy(id, this.props.history);
    }


    /*
      testePop(e, id) {
          console.log('e = '  +e.type);
         $('#confirm-delete').on('click', '.btn-ok', function (e) {
              console.log('ok1' + id);
             // $(this).find('.btn-ok').attr('value', $(e.relatedTarget).data('value'));
              console.log($(this).find('.btn-ok').attr('value'));
          });
      }
      }*/


    render() {

        const {strategyList} = this.props.strategy;

        return (
            <div className="container">
                <br/>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Estrategias</li>
                    </ol>
                </nav>
                <br/>
                <div className="content" id="mission">

                    <table border="1" className="table table-striped  table-responsive   ">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Opção</th>
                            <th>Strike</th>
                            <th>valor</th>
                            <th>Qtde</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th colSpan="2" align="right">rolagem</th>
                            <th>s</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {strategyList.map(strategy => (
                            <tr key={strategy.id}>
                                <td>{strategy.name}</td>
                                <td>{strategy.optionType}</td>
                                <td>{strategy.longOption}</td>
                                <td>{strategy.longStrike}</td>
                                <td>{strategy.longPrice}</td>
                                <td>{strategy.longQuantity}</td>
                                <td>{moment(strategy.longDate).format('DD/MM/YYYY')}</td>
                                <td>No Game</td>
                                <td>
                                    <Link to={`/listStrategyScrolls/${strategy.id}`} className="btn btn-sm btn-primary">
                                        <Tooltip title="Rolagens">
                                            <ListAltIcon/>
                                        </Tooltip>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/editScroll/${strategy.id}`} className="btn btn-sm btn-primary">
                                        <Tooltip title="Adicionar">
                                            <AddCircleOutlineIcon/>
                                        </Tooltip>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger" type="button"
                                            onClick={this.deleteStrategy.bind(this, strategy.id)}>
                                        <Tooltip title="Delete estratégia">
                                            <RemoveCircleOutline/>
                                        </Tooltip>
                                    </button>
                                </td>
                                <td>

                                    <Link to={`/updateStrategy/${strategy.id}`}
                                          className="btn btn-sm btn-info">
                                        <Tooltip title="Editar estratégia">
                                            <EditIcon/>
                                        </Tooltip>
                                    </Link>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    strategy: state.strategy

});
export default connect(mapStateToProps, {getStrategyList, deleteStrategy})(ListStrategy);

