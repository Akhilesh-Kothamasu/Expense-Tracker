import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseTrendingChart = ({ expenses }) => {
  // Group expenses by category and calculate total spending for each category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const { category, price } = expense;
    acc[category] = acc[category] ? acc[category] + price : price;
    return acc;
  }, {});

  // Convert the grouped data into an array of objects
  const data = Object.keys(expensesByCategory).map(category => ({
    category,
    spending: expensesByCategory[category],
  }));

  return (
    <div>
      <ResponsiveContainer width={417} height={345}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="spending" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseTrendingChart;
