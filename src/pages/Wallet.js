import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { deleteExpense } from '../redux/actions';

class Wallet extends React.Component {
  /* currencyName = (currency) => {
    switch (currency) {
    case 'USD': {
      return 'Dólar Americano';
    }
    case 'CAD': {
      return 'Dólar Canadense';
    }
    case 'GBP': {
      return 'Libra Esterlina';
    }
    case 'ARS': {
      return 'Peso Argentino';
    }
    case 'BTC': {
      return 'Bitcoin';
    }
    case 'LTC': {
      return 'Litecoin';
    }
    case 'EUR': {
      return 'Euro';
    }
    case 'JPY': {
      return 'Iene Japonês';
    }
    case 'CHF': {
      return 'Franco Suiço';
    }
    case 'AUD': {
      return 'Dólar Australiano';
    }
    case 'CNY': {
      return 'Yuan Chinês';
    }
    case 'CNY': {
      return 'Shekel Israelense';
    }
    case 'ETH': {
      return 'Ether';
    }
    case 'XRP': {
      return 'Ripple';
    }
    case 'DOGE': {
      return 'Dogecoin';
    }
  }; */
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
                  <td>{expense.value}</td>
                  <td>{expense.currency}</td>
                  <td>{expense.exchangeRates[expense.currency].ask}</td>
                  <td>
                    {(expense.value * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td id={ expense.id }>
                    <button type="button">Editar</button>
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

/* Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
   expenses: PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.string.isRequired,
    }),
  }).isRequired,
}; */

export default connect(mapStateToProps)(Wallet);
