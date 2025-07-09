import React, { useState } from 'react';
import './TransactionForm.css';

const TransactionForm = ({ onAdd, balance }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'income',
    category: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.category) {
      alert('⚠️ Please fill in all fields.');
      return;
    }

    const amount = parseFloat(formData.amount);

    if (formData.type === 'expense' && balance <= 0) {
      alert('❌ Cannot add expense. No money left in your budget!');
      return;
    }

    if (formData.type === 'expense' && amount > balance) {
      alert(`❌ Cannot add expense of ₹${amount}. Only ₹${balance} left!`);
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: formData.title,
      amount: amount,
      type: formData.type,
      category: formData.category,
      date: new Date().toISOString(), // ✅ add timestamp for filtering by month/year
    };

    onAdd(newTransaction);

    // Reset form
    setFormData({
      title: '',
      amount: '',
      type: 'income',
      category: '',
    });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Transaction Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        required
      />

      <input
        type="number"
        placeholder="Amount (e.g. 1000)"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: e.target.value })
        }
        required
      />

      <select
        value={formData.type}
        onChange={(e) =>
          setFormData({ ...formData, type: e.target.value })
        }
        required
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={formData.category}
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
        required
      >
        <option value="">Select Category</option>
        <option value="Salary">Salary</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
