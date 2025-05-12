import React from 'react';
import { useJobs } from '../../contexts/JobsContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend
);

const MaintenanceTrend = () => {
  const { jobs } = useJobs();

  // Get last 6 months
  const getLastSixMonths = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleString('default', { month: 'short' }));
    }
    return months;
  };

  // Count jobs by status for each month
  const getJobCountsByStatus = () => {
    const months = getLastSixMonths();
    const completed = months.map(month => {
      return jobs.filter(job => {
        const jobDate = new Date(job.scheduledDate);
        return job.status === 'Completed' && 
               jobDate.toLocaleString('default', { month: 'short' }) === month;
      }).length;
    });

    const inProgress = months.map(month => {
      return jobs.filter(job => {
        const jobDate = new Date(job.scheduledDate);
        return job.status === 'In Progress' && 
               jobDate.toLocaleString('default', { month: 'short' }) === month;
      }).length;
    });

    const open = months.map(month => {
      return jobs.filter(job => {
        const jobDate = new Date(job.scheduledDate);
        return job.status === 'Open' && 
               jobDate.toLocaleString('default', { month: 'short' }) === month;
      }).length;
    });

    return { completed, inProgress, open };
  };

  const { completed, inProgress, open } = getJobCountsByStatus();

  const data = {
    labels: getLastSixMonths(),
    datasets: [
      {
        label: 'Completed',
        data: completed,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.1
      },
      {
        label: 'In Progress',
        data: inProgress,
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        tension: 0.1
      },
      {
        label: 'Open',
        data: open,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Maintenance Jobs Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line data={data} options={options} />
    </div>
  );
};

export default MaintenanceTrend; 