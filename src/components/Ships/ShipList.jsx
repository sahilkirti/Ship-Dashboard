import React from 'react';
import { Link } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';
import { canManageShips } from '../../utils/roleUtils';
import { useAuth } from '../../contexts/AuthContext';

const ShipList = () => {
  const { ships } = useShips();
  const { currentUser } = useAuth();
  const canManage = canManageShips(currentUser?.role);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Ships</h3>
        {canManage && (
          <Link
            to="/ships/new"
            className="btn btn-primary"
          >
            Add New Ship
          </Link>
        )}
      </div>
      <ul className="divide-y divide-gray-200">
        {ships.map((ship) => (
          <li key={ship.id}>
            <Link
              to={`/ships/${ship.id}`}
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {ship.name}
                    </p>
                    <p className="ml-2 flex-shrink-0 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {ship.status}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {ship.type}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {ship.location}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Last updated: {new Date(ship.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipList;
