import React, { useState, useEffect } from 'react';
import { Expense } from '../types';

interface ExpenseFormProps {
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  editExpense?: Expense; 
  setEditExpense?: React.Dispatch<React.SetStateAction<Expense | null>>;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ setExpenses, editExpense, setEditExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editExpense) {
      setDescription(editExpense.description);
      setAmount(editExpense.amount);
      setCategory(editExpense.category);
      setDate(editExpense.date);
    }
  }, [editExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editExpense) {
      setExpenses(prevExpenses =>
        prevExpenses.map(expense =>
          expense.id === editExpense.id
            ? { ...expense, description, amount, category, date }
            : expense
        )
      );
      if (setEditExpense) setEditExpense(null);
    } else {
      const newExpense: Expense = {
        id: Date.now(),
        description,
        amount,
        category,
        date,
      };
      setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    }
    setDescription('');
    setAmount(0);
    setCategory('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="border border-gray-300 p-2 mr-2 rounded-lg w-full mb-2"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        required
        className="border border-gray-300 p-2 mr-2 rounded-lg w-full mb-2"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
        className="border border-gray-300 p-2 mr-2 rounded-lg w-full mb-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border border-gray-300 p-2 mr-2 rounded-lg w-full mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
        {editExpense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
