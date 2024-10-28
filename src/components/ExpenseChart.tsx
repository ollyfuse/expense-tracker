// src/components/ExpenseChart.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Expense } from '../types'; // Adjust import as necessary

Chart.register(...registerables);

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  // Get unique categories
  const categories = Array.from(new Set(expenses.map(expense => expense.category)));

  // Prepare data for the chart
  const chartData = {
    labels: categories, // Unique categories
    datasets: [
      {
        label: 'Expenses by Category',
        data: categories.map(category =>
          expenses
            .filter(expense => expense.category === category) // Filter expenses by category
            .reduce((sum, expense) => sum + expense.amount, 0) // Sum amounts by category
        ),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="mb-4">
      <h2 className="font-bold text-xl mb-2">Expenses Breakdown</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpenseChart;
