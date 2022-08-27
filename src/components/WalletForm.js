import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAPI } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesAPI());
  }

  render() {
    const { data } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Despesa:
          <input type="text" data-testid="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input type="text" data-testid="description-input" />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select data-testid="currency-input">
            {data.map((currency, index) => (
              <option key={ index } value={ currency }>{currency}</option>))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria da despesa:
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}
WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    data: state.wallet.currencies,
  };
}

export default connect(mapStateToProps)(WalletForm);
