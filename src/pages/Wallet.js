import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { deleteExpense } from '../redux/actions';

class Wallet extends React.Component {
  delete = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(target.parentElement.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <Header />
        <WalletForm />
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
                  <td>{expense.exchangeRates[expense.currency].name}</td>
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
                    <button type="button" data-testid="edit-btn">Editar despesa</button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.delete }
                    >
                      Excluir

                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Wallet);
