import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, setData } from '../../utils/localStorageUtils';

const ComponentForm = () => {
  const { shipId, componentId } = useParams();
  const navigate = useNavigate();

  // If editing, find the component to pre-fill form
  const components = getData('components') || [];
  const existingComponent = components.find(c => c.id === componentId);

  const [formData, setFormData] = useState(
    existingComponent || { name: '', type: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComponent = { ...formData, shipId, id: componentId || Date.now().toString() };

    if (componentId) {
      const updatedComponents = components.map(component =>
        component.id === componentId ? newComponent : component
      );
      setData('components', updatedComponents);
    } else {
      setData('components', [...components, newComponent]);
    }

    navigate(`/ships/${shipId}/components`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4 font-semibold">
        {componentId ? 'Edit Component' : 'Add New Component'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Component Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Type</label>
          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {componentId ? 'Update Component' : 'Save Component'}
        </button>
      </form>
    </div>
  );
};

export default ComponentForm;
