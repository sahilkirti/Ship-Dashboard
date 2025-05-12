import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { getData } from '../../utils/localStorageUtils';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Charts = () => {
  const ships = getData('ships') || [];
  const jobs = getData('jobs') || [];
  const components = getData('components') || [];

  const dataCounts = {
    Ships: ships.length,
    Jobs: jobs.length,
    Components: components.length,
  };

  const labels = Object.keys(dataCounts);
  const values = Object.values(dataCounts);
  const colors = ['#3B82F6', '#10B981', '#FBBF24'];

  const pieData = {
    labels,
    datasets: [
      {
        label: 'Distribution',
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Count',
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
        <Pie data={pieData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Bar Chart</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;
