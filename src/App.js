import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import Chart from './components/Chart';
import CategoryPieChart from './components/CategoryPieChart';
import BudgetBar from './components/BudgetBar';
import { exportTransactionsToCSV } from './utils/exportCSV';
import { exportTransactionsToPDF } from './utils/exportPDF';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem('transactions');
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      // Ensure each transaction has a valid date field
      return parsed.map(tx => ({
        ...tx,
        date: tx.date || new Date().toISOString(),
      }));
    } catch (err) {
      console.error('Invalid data in localStorage. Clearing...', err);
      localStorage.removeItem('transactions');
      return [];
    }
  });

  const [filterType, setFilterType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDeleteTransaction = (id) => {
    const updated = transactions.filter((tx) => tx.id !== id);
    setTransactions(updated);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const isSameMonth = txDate.getMonth() === selectedMonth;
    const isSameYear = txDate.getFullYear() === selectedYear;
    const matchesType = filterType === 'all' || tx.type === filterType;
    return isSameMonth && isSameYear && matchesType;
  });

  const income = filteredTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = filteredTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = income - expense;

  return (
    <div className="app-container">
      <h1>💰 Finance Budget Tracker</h1>

      {/* Month and Year Selector */}
      <div className="month-filter">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
      </div>
      <div className="export-container">
  <button onClick={() => exportTransactionsToCSV(filteredTransactions)}>
    📤 Export CSV
  </button>
  <button onClick={() => exportTransactionsToPDF(filteredTransactions, income, expense)}>
    🧾 Export PDF
  </button>
</div>



      <Summary transactions={filteredTransactions} />
      <BudgetBar income={income} expense={expense} />
      <Chart transactions={filteredTransactions} />
      <CategoryPieChart transactions={filteredTransactions} />
      <TransactionForm onAdd={handleAddTransaction} balance={balance} />
      <TransactionList
        transactions={filteredTransactions}
        onDelete={handleDeleteTransaction}
        filterType={filterType}
        setFilterType={setFilterType}
      />
    </div>
  );
}

export default App;
