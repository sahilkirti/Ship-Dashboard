import React, { useState, useEffect } from 'react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useJobs } from '../../contexts/JobsContext';
import { useShips } from '../../contexts/ShipsContext';
import { useComponents } from '../../contexts/ComponentsContext';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { jobs } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();

  useEffect(() => {
    // Generate notifications based on jobs, ships, and components
    const newNotifications = [];

    // Check for upcoming maintenance jobs
    jobs.forEach(job => {
      const scheduledDate = new Date(job.scheduledDate);
      const today = new Date();
      const daysUntil = Math.ceil((scheduledDate - today) / (1000 * 60 * 60 * 24));

      if (daysUntil <= 7 && daysUntil > 0) {
        const ship = ships.find(s => s.id === job.shipId);
        const component = components.find(c => c.id === job.componentId);
        
        newNotifications.push({
          id: `job-${job.id}`,
          type: 'maintenance',
          title: 'Upcoming Maintenance',
          message: `${job.type} scheduled for ${ship?.name || 'Ship'} in ${daysUntil} days`,
          timestamp: new Date(),
          priority: job.priority,
          component: component?.name,
          ship: ship?.name
        });
      }
    });

    // Check for overdue maintenance
    jobs.forEach(job => {
      const scheduledDate = new Date(job.scheduledDate);
      const today = new Date();
      
      if (scheduledDate < today && job.status === 'Open') {
        const ship = ships.find(s => s.id === job.shipId);
        const component = components.find(c => c.id === job.componentId);
        
        newNotifications.push({
          id: `overdue-${job.id}`,
          type: 'alert',
          title: 'Overdue Maintenance',
          message: `${job.type} for ${ship?.name || 'Ship'} is overdue`,
          timestamp: new Date(),
          priority: 'High',
          component: component?.name,
          ship: ship?.name
        });
      }
    });

    // Sort notifications by priority and timestamp
    newNotifications.sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.timestamp - a.timestamp;
    });

    setNotifications(newNotifications);
  }, [jobs, ships, components]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return '🔧';
      case 'alert':
        return '⚠️';
      default:
        return '📢';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 focus:outline-none"
      >
        <BellIcon className="h-6 w-6 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="text-2xl" role="img" aria-label={notification.type}>
                          {getTypeIcon(notification.type)}
                        </span>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.message}
                        </p>
                        {notification.component && (
                          <p className="mt-1 text-xs text-gray-400">
                            Component: {notification.component}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-gray-400">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
