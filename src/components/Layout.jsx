import React from 'react';
import Navbar from './Navbar';
import NotificationCenter from './Notifications/NotificationCenter';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <NotificationCenter />
    </div>
  );
};

export default Layout; 