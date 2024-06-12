import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ExpenseSummaryChart = ({ expenses }) => {
  
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const { category, price } = expense;
    acc[category] = acc[category] ? acc[category] + price : price;
    return acc;
  }, {});

  const pieData = Object.keys(expensesByCategory).map(category => ({
    name: category,
    value: expensesByCategory[category],
  }));

  if (pieData.length === 0) {
    return <p>No expenses to display</p>;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

  const renderCustomLabel = ({ name, value, percent }) => {
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div>
      <PieChart width={210} height={210}>
        <Pie
          data={pieData}
          cx={100}
          cy={100}
          labelLine={false}
          label={renderCustomLabel}
          
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpenseSummaryChart;
