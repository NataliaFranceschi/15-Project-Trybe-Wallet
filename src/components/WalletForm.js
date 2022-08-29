import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAPI, addExpense } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { dataCurrency } = this.props;
    const { value, description } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Despesa:
          <input
            type="text"
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            {dataCurrency.map((currency, index) => (
              <option key={ index } value={ currency }>{currency}</option>))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select data-testid="method-input" name="method" onChange={ this.handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria da despesa:
          <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar Despesa</button>
      </form>
    );
  }
}
WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataCurrency: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  data: PropTypes.objectOf(
    PropTypes.object.isRequired,
  ).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

function mapStateToProps(state) {
  return {
    dataCurrency: state.wallet.currencies,
    data: state.wallet.dataAPI,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(WalletForm);
