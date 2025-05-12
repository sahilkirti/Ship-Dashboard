import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShipList from '../components/Ships/ShipList';
import ShipForm from '../components/Ships/ShipForm';
import ShipDetail from '../components/Ships/ShipDetail';
import JobsPage from './JobsPage';

function ShipsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route index element={<ShipList />} />
        <Route path="new" element={<ShipForm />} />
        <Route path=":id" element={<ShipDetail />} />
        <Route path=":id/edit" element={<ShipForm />} />
        <Route path=":shipId/jobs/*" element={<JobsPage />} />
      </Routes>
    </div>
  );
}

export default ShipsPage;
