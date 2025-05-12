import React from 'react';
import { getData } from '../../utils/localStorageUtils';

const KPICards = () => {
  const ships = getData('ships') || [];
  const jobs = getData('jobs') || [];
  const components = getData('components') || [];
  const users = getData('users') || [];

  const stats = [
    { label: 'Ships', count: ships.length, color: 'bg-blue-500' },
    { label: 'Jobs', count: jobs.length, color: 'bg-green-500' },
    { label: 'Components', count: components.length, color: 'bg-yellow-500' },
    { label: 'Users', count: users.length, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(({ label, count, color }) => (
        <div key={label} className={`p-4 text-white rounded shadow ${color}`}>
          <h3 className="text-lg font-semibold">{label}</h3>
          <p className="text-2xl">{count}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
