import React from 'react';
import './TransactionList.css';

const TransactionList = ({ transactions, onDelete, filterType, setFilterType }) => {
  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <h2>Transaction History</h2>
        <div className="filter-buttons">
          <button
            className={filterType === 'all' ? 'active' : ''}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button
            className={filterType === 'income' ? 'active' : ''}
            onClick={() => setFilterType('income')}
          >
            Income
          </button>
          <button
            className={filterType === 'expense' ? 'active' : ''}
            onClick={() => setFilterType('expense')}
          >
            Expense
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions to show.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className={tx.type === 'income' ? 'income' : 'expense'}
            >
              <span>{tx.title}</span>
              <span>₹ {tx.amount}</span>
              <button onClick={() => onDelete(tx.id)}>✖</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
