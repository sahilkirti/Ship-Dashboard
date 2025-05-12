import React from 'react';
import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';
import RecentActivity from '../components/Dashboard/RecentActivity';

/**
 * Dashboard page component
 * Displays key metrics, charts, and recent activity
 * Used as the main landing page after login
 */
const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your fleet's maintenance status and activities
        </p>
      </div>
      
      {/* Key performance indicators */}
      <KPICards />
      
      {/* Analytics charts */}
      <div className="mt-8">
        <Charts />
      </div>
      
      {/* Recent activity feed */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
