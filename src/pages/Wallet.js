import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { deleteExpense, fetchCurrenciesAPI,
  addExpense, editExpense } from '../redux/actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      edit: false,
      id: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  indexOf = () => {
    const { expenses } = this.props;
    return expenses.length;
  };

  expensesInformation = () => {
    const { data } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return {
      id: this.indexOf(),
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesAPI());
    dispatch(addExpense(this.expensesInformation()));

    this.setState({
      value: '',
      description: '',
    });
  };

  editExpense = ({ target }) => {
    const { expenses } = this.props;
    const { id } = target.parentElement;
    const expense = expenses.find((item) => item.id === Number(id));
    this.setState({
      edit: true,
      value: expense.value,
      description: expense.description,
      id,
    });
  };

  changeExpenses = () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const newobj = {
      id: Number(id),
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(editExpense(newobj));
    this.setState({ edit: false });
  };

  delete = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(target.parentElement.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <Header />
        <WalletForm
          { ...this.state }
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          changeExpenses={ this.changeExpenses }
        />
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
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ this.editExpense }
                    >
                      Editar despesa

                    </button>
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
    data: state.wallet.dataAPI,
  };
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  data: PropTypes.objectOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Wallet);
