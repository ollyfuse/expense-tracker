import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import { Expense } from './types';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [groupBy, setGroupBy] = useState<'category' | 'date'>('category');
  const [editExpense, setEditExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Expense Tracker</h1>
      <ExpenseForm 
        setExpenses={setExpenses} 
        editExpense={editExpense} 
        setEditExpense={setEditExpense} 
      />
      <div className="mb-4">
        <label className="mr-2 text-gray-600">Group by:</label>
        <select 
          value={groupBy} 
          onChange={(e) => setGroupBy(e.target.value as 'category' | 'date')} 
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="category">Category</option>
          <option value="date">Date</option>
        </select>
      </div>
      <ExpenseList 
        expenses={expenses} 
        setExpenses={setExpenses} 
        setEditExpense={setEditExpense} 
        groupBy={groupBy} 
      />
      <ExpenseChart expenses={expenses} />
    </div>
  );
};

export default App;
