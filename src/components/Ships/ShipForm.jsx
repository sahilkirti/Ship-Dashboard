import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../../utils/localStorageUtils';

const ShipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: '',
    components: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ships = getData('ships') || [];
    const newShip = {
      ...formData,
      id: Date.now().toString(),
    };

    setData('ships', [...ships, newShip]);

    navigate('/ships');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4 font-semibold">Add New Ship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Ship Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">IMO</label>
          <input
            name="imo"
            value={formData.imo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Flag</label>
          <input
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <input
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Components</label>
          <input
            name="components"
            value={formData.components}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Ship
        </button>
      </form>
    </div>
  );
};

export default ShipForm;
