import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { dataCurrency, handleChange, handleClick, value,
      description, edit, changeExpenses, method, tag, currency } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Despesa:
          <input
            className="input is-primary value"
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
            className="input is-primary"
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <div className="select is-primary">
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ handleChange }
            >
              {dataCurrency.map((item, index) => (
                <option key={ index } value={ item }>{item}</option>))}
            </select>
          </div>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <div className="select is-primary">
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
        </label>
        <label htmlFor="tag-input">
          Categoria da despesa:
          <div className="select is-primary Tag">
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
        </label>
        {
          edit
            ? (
              <button
                className="button is-primary is-small"
                type="button"
                onClick={ changeExpenses }
              >
                Editar despesa

              </button>
            )
            : (
              <button
                className="button is-black is-small"
                type="button"
                onClick={ handleClick }
              >
                Adicionar Despesa

              </button>
            )
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
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    dataCurrency: state.wallet.currencies,
    data: state.wallet.dataAPI,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(WalletForm);
