import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '../../utils/localStorageUtils';

const ShipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ships = getData('ships') || [];
  const ship = ships.find((s) => s.id === id);

  if (!ship) {
    return (
      <div className="p-4">
        <p className="text-red-600">Ship not found. Please check the ID and try again.</p>
        <button
          onClick={() => navigate('/ships')}
          className="mt-2 text-blue-600 hover:underline"
        >
          Go Back to Ship List
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Ship Details</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {ship.name}</p>
        <p><strong>IMO:</strong> {ship.imo}</p>
        <p><strong>Flag:</strong> {ship.flag}</p>
        <p><strong>Status:</strong> {ship.status}</p>
      </div>
      <button
        onClick={() => navigate('/ships')}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Back to Ship List
      </button>
    </div>
  );
};

export default ShipDetail;
