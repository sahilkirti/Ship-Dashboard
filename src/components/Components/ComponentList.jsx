import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData } from '../../utils/localStorageUtils';

const ComponentList = () => {
  const { shipId } = useParams(); // Get shipId from URL
  const components = getData('components') || [];

  // Filter components for this specific ship
  const shipComponents = components.filter(comp => comp.shipId === shipId);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Components for Ship ID: {shipId}</h2>
        <Link
          to={`/ships/${shipId}/components/new`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Component
        </Link>
      </div>

      {shipComponents.length === 0 ? (
        <p className="text-gray-600">No components found for this ship.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Serial Number</th>
              <th className="border px-3 py-2 text-left">Install Date</th>
              <th className="border px-3 py-2 text-left">Last Maintenance</th>
            </tr>
          </thead>
          <tbody>
            {shipComponents.map((component) => (
              <tr key={component.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{component.name}</td>
                <td className="border px-3 py-2">{component.serialNumber}</td>
                <td className="border px-3 py-2">{component.installDate || 'N/A'}</td>
                <td className="border px-3 py-2">{component.lastMaintenanceDate || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComponentList;
