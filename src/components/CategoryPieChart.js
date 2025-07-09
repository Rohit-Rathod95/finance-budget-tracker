import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './CategoryPieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ transactions }) => {
  // Only filter expense transactions
  const expenseTransactions = transactions.filter((tx) => tx.type === 'expense');

  // Group expenses by category
  const categoryTotals = {};
  expenseTransactions.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#f39c12', '#e74c3c', '#2ecc71', '#3498db',
          '#9b59b6', '#1abc9c', '#7f8c8d'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="category-chart">
      <h3>📊 Expense by Category</h3>
      <Pie data={data} />
    </div>
  );
};

export default CategoryPieChart;
