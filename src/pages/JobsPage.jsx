import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import JobList from '../components/Jobs/JobList';
import JobForm from '../components/Jobs/JobForm';
import JobDetail from '../components/Jobs/JobDetail';
import { useJobs } from '../contexts/JobsContext';

function JobsPage() {
  const { shipId } = useParams();
  const { jobs } = useJobs();

  // Show all jobs if not viewing ship-specific jobs
  if (!shipId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Jobs</h1>
        
        {jobs.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No jobs found</p>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Ship</th>
                  <th className="px-4 py-2 text-left">Priority</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{job.type}</td>
                    <td className="px-4 py-2">Ship {job.shipId}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        job.priority === 'High' ? 'bg-red-100 text-red-800' :
                        job.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {job.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(job.scheduledDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={`/ships/${job.shipId}/jobs/${job.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // Show ship-specific jobs
  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route index element={<JobList shipId={shipId} />} />
        <Route path="new" element={<JobForm shipId={shipId} />} />
        <Route path=":jobId" element={<JobDetail />} />
        <Route path=":jobId/edit" element={<JobForm />} />
      </Routes>
    </div>
  );
}

export default JobsPage;
