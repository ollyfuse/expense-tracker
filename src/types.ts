// src/types.ts

export interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
    date: string; // Add date property to the Expense type
  }
  