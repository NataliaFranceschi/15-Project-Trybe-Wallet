import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses, deleteItem, editExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td>
                  {Number(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}

                </td>
                <td>
                  {(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td id={ expense.id }>
                  <button
                    className="button is-primary is-small"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ editExpense }
                  >
                    Editar

                  </button>
                  <button
                    className="button is-small is-danger"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ deleteItem }
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
    data: state.wallet.dataAPI,
  };
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  deleteItem: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
