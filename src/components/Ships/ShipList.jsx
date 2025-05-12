import React from 'react';
import { getData } from '../../utils/localStorageUtils';
import { Link } from 'react-router-dom';

const ShipList = () => {
  const ships = getData('ships') || [];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Ships</h2>
        <Link
          to="/ships/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Ship
        </Link>
      </div>
      {ships.length === 0 ? (
        <p className="text-gray-600">No ships available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ships.map((ship, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{ship.name}</td>
                <td className="border px-3 py-2 space-x-4">
                  <Link
                    to={`/ships/${ship.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/ships/${ship.id}/components`}
                    className="text-green-600 hover:underline"
                  >
                    Components
                  </Link>
                  <Link
                    to={`/ships/${ship.id}/jobs`}
                    className="text-purple-600 hover:underline"
                  >
                    Jobs
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

export default ShipList;
