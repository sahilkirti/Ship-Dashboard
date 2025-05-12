import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../contexts/JobsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { useAuth } from '../../contexts/AuthContext';
import { canManageJobs } from '../../utils/roleUtils';

const JobList = ({ shipId }) => {
  const { getJobsByShipId } = useJobs();
  const { getComponentById } = useComponents();
  const { currentUser } = useAuth();
  const canManage = canManageJobs(currentUser?.role);

  const jobs = getJobsByShipId(shipId);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Jobs</h2>
        {canManage && (
          <Link
            to={`/ships/${shipId}/jobs/new`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Job
          </Link>
        )}
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs found for this ship.</p>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Component</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => {
                const component = getComponentById(job.componentId);
                return (
                  <tr key={job.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{job.type}</td>
                    <td className="px-4 py-2">
                      {component ? `${component.name} (${component.serialNumber})` : 'Unknown'}
                    </td>
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
                      <Link
                        to={`/ships/${shipId}/jobs/${job.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobList;
