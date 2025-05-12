import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import JobList from '../components/Jobs/JobList';
import JobForm from '../components/Jobs/JobForm';

function JobsPage() {
  const { shipId } = useParams();

  return (
    <Routes>
      <Route path="/" element={<JobList shipId={shipId} />} />
      <Route path="new" element={<JobForm />} />
      <Route path=":jobId" element={<JobForm />} />
    </Routes>
  );
}

export default JobsPage;
