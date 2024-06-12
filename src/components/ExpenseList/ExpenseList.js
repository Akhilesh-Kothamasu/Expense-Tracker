import React, { useState } from 'react';
import './ExpenseList.css';
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

const ExpenseList = ({ expenses, setExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({ id: null, title: '', price: '', category: '', date: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 3;

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const startEditing = (expense) => {
    setIsEditing(true);
    setCurrentExpense({ ...expense, price: expense.price.toString() });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExpense({ ...currentExpense, [name]: value });
  };

  const saveExpense = (e) => {
    e.preventDefault();
    setExpenses(expenses.map(expense => (expense.id === currentExpense.id ? { ...currentExpense, price: Number(currentExpense.price) } : expense)));
    setIsEditing(false);
    setCurrentExpense({ id: null, title: '', price: '', category: '', date: '' });
  };

  // Pagination
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);
  const totalPages = Math.ceil(expenses.length / expensesPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="expense-list">
      <div className='transactions-heading'>Recent Transactions</div>
      {isEditing && (
        <div className="edit-modal-overlay">
          <div className="edit-modal-content">
            <h2 className='edit-heading'>Edit Expenses</h2>
            <form className="edit-form" onSubmit={saveExpense}>
              <div>
                <input
                  type="text"
                  name="title"
                  value={currentExpense.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={currentExpense.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="category"
                  value={currentExpense.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={currentExpense.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <button type="submit" className='edit-save'>Add Expenses</button>
                <button type="button" className='edit-cancel' onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {!isEditing && (
        <div className='table'>
          <ul list-style-type='none'>
            {currentExpenses.map(expense => (
              <div key={expense.id} className="expense-item" >
                <div>
                  <div>{expense.title}</div>
                  <div>{expense.date}</div>
                </div>
                <div className='price-edit-delete'>
                  <div> ₹{expense.price}</div>
                  <button onClick={() => startEditing(expense)} className='edit-button'><MdEdit /></button>
                  <button onClick={() => deleteExpense(expense.id)} className='delete-button'><AiOutlineDelete /></button>
                </div>
              </div>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
