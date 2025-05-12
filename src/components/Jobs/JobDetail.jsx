import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../../contexts/JobsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { useShips } from '../../contexts/ShipsContext';
import { useAuth } from '../../contexts/AuthContext';
import { canManageJobs } from '../../utils/roleUtils';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { getComponentById } = useComponents();
  const { getShipById } = useShips();
  const { currentUser } = useAuth();
  const canManage = canManageJobs(currentUser?.role);

  const job = getJobById(jobId);
  const component = job ? getComponentById(job.componentId) : null;
  const ship = job ? getShipById(job.shipId) : null;

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Job not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Job Details</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Back
          </button>
          {canManage && (
            <Link
              to={`/ships/${job.shipId}/jobs/${job.id}/edit`}
              className="btn btn-primary"
            >
              Edit Job
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Job Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details about the maintenance job.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{job.type}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {job.status}
                </span>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Priority</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  job.priority === 'High' ? 'bg-red-100 text-red-800' :
                  job.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {job.priority}
                </span>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Scheduled Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(job.scheduledDate).toLocaleString()}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">{job.description || 'No description provided'}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Component Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details about the component being maintained.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          {component ? (
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{component.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Serial Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{component.serialNumber}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Install Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(component.installDate).toLocaleDateString()}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Last Maintenance</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(component.lastMaintenanceDate).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-gray-500">Component information not available</p>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Ship Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details about the ship where the maintenance is being performed.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          {ship ? (
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{ship.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">IMO Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{ship.imo}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Flag</dt>
                <dd className="mt-1 text-sm text-gray-900">{ship.flag}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ship.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {ship.status}
                  </span>
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-gray-500">Ship information not available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail; 