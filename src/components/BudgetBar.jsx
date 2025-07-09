import React from 'react';
import './BudgetBar.css';

const BudgetBar = ({ income, expense }) => {
  const spentPercentage = income > 0 ? (expense / income) * 100 : 0;

  return (
    <div className="budget-bar-wrapper">
      <p>Budget Used: {Math.min(spentPercentage, 100).toFixed(1)}%</p>
      <div className="budget-bar">
        <div
          className="budget-bar-fill"
          style={{
            width: `${Math.min(spentPercentage, 100)}%`,
            backgroundColor: spentPercentage >= 80 ? '#e74c3c' : '#2ecc71',
          }}
        />
      </div>
    </div>
  );
};

export default BudgetBar;
