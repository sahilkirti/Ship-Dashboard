import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { useJobs } from '../../contexts/JobsContext';
import { canManageShips } from '../../utils/roleUtils';
import { useAuth } from '../../contexts/AuthContext';

const ShipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getShipById } = useShips();
  const { getComponentsByShipId } = useComponents();
  const { getJobsByShipId } = useJobs();
  const { currentUser } = useAuth();
  const canManage = canManageShips(currentUser?.role);

  const ship = getShipById(id);
  const components = getComponentsByShipId(id);
  const jobs = getJobsByShipId(id);

  if (!ship) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Ship not found</h2>
        <button
          onClick={() => navigate('/ships')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Ships
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Ship Details</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/ships')}
            className="btn btn-secondary"
          >
            Back to Ships
          </button>
          {canManage && (
            <Link
              to={`/ships/${id}/edit`}
              className="btn btn-primary"
            >
              Edit Ship
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Ship Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details about the ship and its current status.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
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
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Components
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              List of components installed on this ship.
            </p>
          </div>
          {canManage && (
            <Link
              to={`/ships/${id}/components/new`}
              className="btn btn-primary"
            >
              Add Component
            </Link>
          )}
        </div>
        <div className="border-t border-gray-200">
          {components.length === 0 ? (
            <div className="px-4 py-5 text-center text-gray-500">
              No components found for this ship.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {components.map((component) => (
                <li key={component.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{component.name}</p>
                      <p className="text-sm text-gray-500">Serial: {component.serialNumber}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm text-gray-500">
                        Last Maintenance: {new Date(component.lastMaintenanceDate).toLocaleDateString()}
                      </p>
                      <Link
                        to={`/ships/${id}/components/${component.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Jobs
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              List of recent maintenance jobs for this ship.
            </p>
          </div>
          {canManage && (
            <Link
              to={`/ships/${id}/jobs/new`}
              className="btn btn-primary"
            >
              Add Job
            </Link>
          )}
        </div>
        <div className="border-t border-gray-200">
          {jobs.length === 0 ? (
            <div className="px-4 py-5 text-center text-gray-500">
              No jobs found for this ship.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <li key={job.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{job.type}</p>
                      <p className="text-sm text-gray-500">
                        Scheduled: {new Date(job.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {job.status}
                      </span>
                      <Link
                        to={`/ships/${id}/jobs/${job.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipDetail;
