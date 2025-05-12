import React from 'react';
import { useJobs } from '../../contexts/JobsContext';
import { useComponents } from '../../contexts/ComponentsContext';

// Simple date formatter
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Activity item component - separated for better readability
const ActivityItem = ({ type, title, timestamp, status }) => {
  // Status colors mapping - using a simple object for maintainability
  const statusColors = {
    'Completed': 'text-green-600',
    'In Progress': 'text-blue-600',
    'Open': 'text-yellow-600'
  };

  return (
    <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0">
        {type === 'job' ? (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </span>
        ) : (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">
          {formatDate(timestamp)}
          {status && (
            <span className={`ml-2 ${statusColors[status] || 'text-gray-600'}`}>
              • {status}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

const RecentActivity = () => {
  const { jobs } = useJobs();
  const { components } = useComponents();

  // Get recent activities - combining jobs and maintenance updates
  const getRecentActivities = () => {
    const activities = [];

    // Get latest jobs
    jobs.slice(0, 5).forEach(job => {
      activities.push({
        type: 'job',
        title: `${job.type} job for ${job.shipId}`,
        timestamp: job.updatedAt || job.createdAt,
        status: job.status
      });
    });

    // Get latest maintenance updates
    components
      .filter(comp => comp.lastMaintenanceDate)
      .sort((a, b) => new Date(b.lastMaintenanceDate) - new Date(a.lastMaintenanceDate))
      .slice(0, 3)
      .forEach(comp => {
        activities.push({
          type: 'maintenance',
          title: `Maintenance completed for ${comp.name}`,
          timestamp: comp.lastMaintenanceDate
        });
      });

    // Sort by timestamp and take the most recent 5
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
  };

  const activities = getRecentActivities();

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No recent activity to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => (
        <ActivityItem
          key={`${activity.type}-${index}`}
          type={activity.type}
          title={activity.title}
          timestamp={activity.timestamp}
          status={activity.status}
        />
      ))}
    </div>
  );
};

export default RecentActivity; 