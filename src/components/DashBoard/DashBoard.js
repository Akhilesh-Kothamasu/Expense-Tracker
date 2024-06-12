import React, { useState, useEffect } from 'react';
import AddExpenseForm from '../AddExpensesForm/AddExpensesForm';
import AddIncomeForm from '../AddIncomeForm/AddIncomeForm';
import ExpenseSummaryChart from '../ExpenseSummaryChart/ExpenseSummaryChart';
import ExpenseList from '../ExpenseList/ExpenseList';
import ExpenseTrendingChart from '../ExpenseTrendsChart/ExpenseTrendsChart';
import './DashBoard.css';


const DashBoard = () => {
  const [walletBalance, setWalletBalance] = useState(() => JSON.parse(localStorage.getItem('walletBalance')) || 5000);
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem('expenses')) || []);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('walletBalance', JSON.stringify(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addIncome = (amount) => {
    setWalletBalance(walletBalance + amount);
  };

  const addExpense = (expense) => {
    if (walletBalance >= expense.price) {
      setExpenses([...expenses, expense]);
      setWalletBalance(walletBalance - expense.price);
    } else {
      alert('Not enough balance');
    }
  };

  const toggleIncomeForm = () => {
    setShowIncomeForm(!showIncomeForm);
  };

  const toggleExpenseForm = () => {
    setShowExpenseForm(!showExpenseForm);
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.price, 0);
  };

  return (
    <div className="dashboard">
      <h3 className="sub-heading">Expense Tracker</h3>
      <div className='container'>
        <div className='wallet-balance'>
          <h1>Wallet Balance: <span >₹{walletBalance}</span></h1>
          <button onClick={toggleIncomeForm}>
            {showIncomeForm ? 'Close Income Form' : '+Add Income'}
          </button>
          {showIncomeForm && <AddIncomeForm addIncome={addIncome} onClose={toggleIncomeForm} />}
        </div>
        <div className='total-expenses'>
          <h1>Expenses: <span>₹{calculateTotalExpenses()}</span></h1>
          <button onClick={toggleExpenseForm}>
            {showExpenseForm ? 'Close Expense Form' : '+Add Expense'}
          </button>
          {showExpenseForm && <AddExpenseForm addExpense={addExpense} onClose={toggleExpenseForm} />}
        </div>
        <div className='expense-summary-chart'>
          <ExpenseSummaryChart expenses={expenses} />
        </div>
      </div>
      <div className='sub-container'>
        <div>
          <div className='expense-list'>
            <ExpenseList expenses={expenses} setExpenses={setExpenses} />
          </div>
        </div>
        <div>
          <div className='expenses-subheading'>Top Expenses</div>
          <div className='expense-chart'>
            <ExpenseTrendingChart expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
