import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportTransactionsToPDF = (transactions, income, expense) => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export.');
    return;
  }

  const doc = new jsPDF();
  const balance = income - expense;

  // 🔁 Get current month/year
  const now = new Date();
  const monthName = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();

  // 📄 Title with month name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`Budget Tracker Report - ${monthName} ${year}`, 14, 20);

  // 💰 Income/Expense Summary
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Income: ₹${income}`, 14, 30);
  doc.text(`Expense: ₹${expense}`, 14, 38);
  doc.text(`Balance: ₹${balance}`, 14, 46);

  // 📋 Table rows
  const tableRows = transactions.map((tx) => [
    tx.title,
    `₹${tx.amount}`,
    tx.type,
    tx.category,
    new Date(tx.date).toLocaleDateString(),
  ]);

  // 📊 Data table
  autoTable(doc, {
    head: [['Title', 'Amount', 'Type', 'Category', 'Date']],
    body: tableRows,
    startY: 55,
    theme: 'striped',
    headStyles: {
      fillColor: [33, 150, 243],
      textColor: [255, 255, 255],
      halign: 'center',
    },
    bodyStyles: {
      halign: 'center',
      valign: 'middle',
    },
    styles: {
      font: 'helvetica',
      fontSize: 10,
      cellPadding: 4,
    },
  });

  // 📆 Footer date
  doc.setFontSize(10);
  doc.text(`Generated on ${now.toLocaleDateString()}`, 14, doc.internal.pageSize.height - 10);

  // 💾 Save file with month name
  doc.save(`budget-report-${monthName}-${year}.pdf`);
};
