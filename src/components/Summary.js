import React from 'react';
import './Summary.css';

const Summary = ({ transactions }) => {
  const income = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = income - expense;

  return (
    <div className="summary">
      <div className="summary-box">
        <h3>Balance</h3>
        <p style={{ color: balance < 0 ? 'red' : '#2ecc71' }}>₹ {balance}</p>
      </div>

      <div className="summary-box">
        <h3>Income</h3>
        <p style={{ color: '#2ecc71' }}>+ ₹ {income}</p>
      </div>

      <div className="summary-box">
        <h3>Expense</h3>
        <p style={{ color: '#e74c3c' }}>- ₹ {expense}</p>
      </div>

      {balance <= 0 && (
        <div className="balance-alert">
          ⚠️ Warning: No money left in your budget!
        </div>
      )}
    </div>
  );
};

export default Summary;
