import { saveAs } from 'file-saver';

export const exportTransactionsToCSV = (transactions) => {
  if (transactions.length === 0) {
    alert('No transactions to export.');
    return;
  }

  const headers = ['Title', 'Amount', 'Type', 'Category', 'Date'];
  const rows = transactions.map((tx) => [
    tx.title,
    tx.amount,
    tx.type,
    tx.category,
    new Date(tx.date).toLocaleDateString(),
  ]);

  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const now = new Date();
  const fileName = `budget-tracker-${now.getFullYear()}-${now.getMonth() + 1}.csv`;

  saveAs(blob, fileName);
};
