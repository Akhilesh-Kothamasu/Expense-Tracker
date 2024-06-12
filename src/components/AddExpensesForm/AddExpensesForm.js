import React, { useState } from 'react';
import './AddExpensesForm.css'; // Ensure to include the modal CSS file

const AddExpenseForm = ({ addExpense, onClose }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || !date) {
      alert('All fields are required');
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      alert('Price must be a positive number');
      return;
    }
    addExpense({
      id: Date.now(),
      title,
      price: Number(price),
      category,
      date,
    });
    resetForm();
    onClose(); // Close the modal after adding expense
  };

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setCategory('');
    setDate('');
  };

  const handleCancel = () => {
    resetForm();
    onClose(); // Close the modal on cancel
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='heading'>Add Expenses</h2>
        <form className="expense-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Title"

              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input

              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <input

              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <input

              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className='add-expense'>Add Expense</button>
            <button type="button" onClick={handleCancel} className='cancel'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
