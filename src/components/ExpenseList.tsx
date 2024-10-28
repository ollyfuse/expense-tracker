import React from 'react';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  setEditExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
  groupBy: 'category' | 'date';
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, setExpenses, setEditExpense, groupBy }) => {
  const groupedExpenses = expenses.reduce((acc: Record<string, Expense[]>, expense) => {
    const key = groupBy === 'category' ? expense.category : expense.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(expense);
    return acc;
  }, {});

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {Object.entries(groupedExpenses).map(([key, items]) => (
        <div key={key} className="mb-4">
          <h2 className="font-bold text-lg">{key}</h2>
          <ul>
            {items.map(expense => (
              <li key={expense.id} className="flex justify-between border-b border-gray-300 py-2">
                <div>
                  <p>{expense.description}</p>
                  <p className="text-gray-600">{expense.category}</p>
                  <p className="text-gray-600">{expense.date}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 font-bold">${expense.amount.toFixed(2)}</span>
                  <button onClick={() => setEditExpense(expense)} className="ml-4 text-blue-500">Edit</button>
                  <button onClick={() => setExpenses(prev => prev.filter(e => e.id !== expense.id))} className="ml-2 text-red-500">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
 