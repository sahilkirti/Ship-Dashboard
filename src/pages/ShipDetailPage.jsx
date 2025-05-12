import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '../utils/localStorageUtils';

function ShipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ships = getData("ships");
  const ship = ships?.find((s) => s.id === id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ship Details</h1>
      {ship ? (
        <>
          <p><strong>Name:</strong> {ship.name}</p>
          <p><strong>IMO:</strong> {ship.imo}</p>
          <p><strong>Flag:</strong> {ship.flag}</p>
          <p><strong>Status:</strong> {ship.status}</p>

          <button
            onClick={() => navigate('/ships')}
            className="mt-4 bg-gray-600 text-white px-2 py-2 rounded hover:bg-gray-700"
          >
            Back to Ship List
          </button>
        </>
      ) : (
        <p>Ship not found.</p>
      )}
    </div>
  );
}

export default ShipDetailPage;
