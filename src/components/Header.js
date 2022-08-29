import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  total = () => {
    const { expenses } = this.props;
    const noExpenses = 0;
    if (expenses.length !== 0) {
      const values = expenses.map((expense) => (expense.value
        * expense.exchangeRates[expense.currency].ask));
      const total = values.reduce((acc, value) => acc + Number(value), 0);
      return total.toFixed(2);
    } return noExpenses.toFixed(2);
  };

  render() {
    const { userLogin } = this.props;
    return (
      <div>
        <span data-testid="email-field">{userLogin.email}</span>
        <span data-testid="total-field">{this.total()}</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userLogin: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  /* expenses: PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      ask: PropTypes.string.isRequired,
    }),
  }).isRequired, */
};

export default connect(mapStateToProps)(Header);
