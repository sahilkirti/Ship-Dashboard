import React from 'react';
import { getData } from '../../utils/localStorageUtils';
import { Link } from 'react-router-dom';

const JobList = ({ shipId }) => {
  const jobs = getData('jobs') || [];
  const shipJobs = jobs.filter(job => job.shipId === shipId);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Jobs</h2>
        <Link
          to={`/ships/${shipId}/jobs/new`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Job
        </Link>
      </div>
      {shipJobs.length === 0 ? (
        <p className="text-gray-600">No jobs found for this ship.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left">Job ID</th>
              <th className="border px-3 py-2 text-left">Component ID</th>
              <th className="border px-3 py-2 text-left">Type</th>
              <th className="border px-3 py-2 text-left">Priority</th>
              <th className="border px-3 py-2 text-left">Status</th>
              <th className="border px-3 py-2 text-left">Engineer ID</th>
              <th className="border px-3 py-2 text-left">Scheduled Date</th>
              <th className="border px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {shipJobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{job.id}</td>
                <td className="border px-3 py-2">{job.componentId}</td>
                <td className="border px-3 py-2">{job.type}</td>
                <td className="border px-3 py-2">{job.priority}</td>
                <td className="border px-3 py-2">{job.status}</td>
                <td className="border px-3 py-2">{job.assignedEngineerId}</td>
                <td className="border px-3 py-2">{job.scheduledDate}</td>
                <td className="border px-3 py-2">
                  <Link
                    to={`/ships/${shipId}/jobs/${job.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobList;
