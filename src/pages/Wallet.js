import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { deleteExpense, fetchCurrenciesAPI,
  addExpense, editExpense } from '../redux/actions';
import Table from '../components/Table';
import '../style/wallet.scss';

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
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
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

  deleteItem = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(target.parentElement.id));
  };

  render() {
    return (
      <div className="wallet">
        <Header />
        <WalletForm
          { ...this.state }
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          changeExpenses={ this.changeExpenses }
        />
        <Table editExpense={ this.editExpense } deleteItem={ this.deleteItem } />
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
