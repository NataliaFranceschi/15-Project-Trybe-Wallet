import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { dataCurrency, handleChange, handleClick, value,
      description, edit, changeExpenses } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Despesa:
          <input
            type="text"
            data-testid="value-input"
            name="value"
            onChange={ handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ handleChange }
          >
            {dataCurrency.map((currency, index) => (
              <option key={ index } value={ currency }>{currency}</option>))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select data-testid="method-input" name="method" onChange={ handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria da despesa:
          <select data-testid="tag-input" name="tag" onChange={ handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {
          edit ? <button type="button" onClick={ changeExpenses }>Editar despesa</button>
            : <button type="button" onClick={ handleClick }>Adicionar Despesa</button>
        }
      </form>
    );
  }
}
WalletForm.propTypes = {
  dataCurrency: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  edit: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  changeExpenses: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    dataCurrency: state.wallet.currencies,
    data: state.wallet.dataAPI,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(WalletForm);
