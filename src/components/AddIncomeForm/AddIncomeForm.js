import React, { useState } from 'react';
import './AddIncomeForm.css'; 

const AddIncomeForm = ({ addIncome, onClose }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid positive number');
      return;
    }
    addIncome(Number(amount));
    setAmount('');
    onClose(); 
  };

  const handleCancel = () => {
    setAmount('');
    onClose(); 
  };

  return (
    <div className="income-modal-overlay">
      <div className="income-modal-content">
        <h2 className='income-heading'>Add Balance</h2>
        <form className="income-form" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Income Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button type="submit" className='add-income'>Add Income</button>
          <button type="button" className='income-cancel'onClick={handleCancel}>Cancel</button>

        </form>
      </div>
    </div>
  );
};

export default AddIncomeForm;
