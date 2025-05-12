import React from 'react';
import { useJobs } from '../../contexts/JobsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const { jobs } = useJobs();
  const { components } = useComponents();

  // Prepare data for maintenance trend
  const getLastSixMonths = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleString('default', { month: 'short' }));
    }
    return months;
  };

  const getMaintenanceTrend = () => {
    const months = getLastSixMonths();
    const completedJobs = months.map(month => {
      return jobs.filter(job => {
        const jobDate = new Date(job.completedAt);
        return job.status === 'Completed' && 
               jobDate.toLocaleString('default', { month: 'short' }) === month;
      }).length;
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Completed Maintenance Jobs',
          data: completedJobs,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  };

  // Prepare data for job status distribution
  const getJobStatusDistribution = () => {
    const statuses = ['Open', 'In Progress', 'Completed'];
    const counts = statuses.map(status => 
      jobs.filter(job => job.status === status).length
    );

    return {
      labels: statuses,
      datasets: [
        {
          label: 'Jobs by Status',
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Maintenance Trends'
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Maintenance Trend</h3>
        <Line data={getMaintenanceTrend()} options={chartOptions} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Job Status Distribution</h3>
        <Bar data={getJobStatusDistribution()} options={chartOptions} />
      </div>
    </div>
  );
};

export default Charts;
