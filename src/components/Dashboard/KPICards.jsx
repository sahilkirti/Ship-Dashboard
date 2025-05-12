import React from 'react';
import { useShips } from '../../contexts/ShipsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { useJobs } from '../../contexts/JobsContext';

/**
 * KPI Card component for displaying individual metrics
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {number} props.value - Metric value
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} props.color - Background color class
 */
const KPICard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${color} transition-all duration-200 hover:shadow-md`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="p-3 bg-opacity-10 bg-gray-900 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

/**
 * KPI Cards component
 * Displays key metrics for ships, maintenance, and jobs
 */
const KPICards = () => {
  const { ships } = useShips();
  const { components } = useComponents();
  const { jobs } = useJobs();

  // Check for components needing maintenance
  const getOverdueComponents = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return components.filter(component => {
      const lastMaintenance = new Date(component.lastMaintenanceDate);
      return lastMaintenance < thirtyDaysAgo;
    }).length;
  };

  // Count jobs by status
  const getJobsByStatus = (status) => {
    return jobs.filter(job => job.status === status).length;
  };

  const kpiData = [
    {
      title: 'Total Ships',
      value: ships.length,
      icon: <ShipIcon />,
      color: 'bg-blue-50'
    },
    {
      title: 'Overdue Maintenance',
      value: getOverdueComponents(),
      icon: <WarningIcon />,
      color: 'bg-red-50'
    },
    {
      title: 'Jobs In Progress',
      value: getJobsByStatus('In Progress'),
      icon: <ClockIcon />,
      color: 'bg-yellow-50'
    },
    {
      title: 'Completed Jobs',
      value: getJobsByStatus('Completed'),
      icon: <CheckIcon />,
      color: 'bg-green-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={kpi.value}
          icon={kpi.icon}
          color={kpi.color}
        />
      ))}
    </div>
  );
};

// Icons
const ShipIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

export default KPICards;
