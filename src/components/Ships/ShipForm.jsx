import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';
import { useAuth } from '../../contexts/AuthContext';
import { canManageShips } from '../../utils/roleUtils';

const ShipForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getShipById, addShip, updateShip } = useShips();
  const { currentUser } = useAuth();
  const canManage = canManageShips(currentUser?.role);

  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const ship = getShipById(id);
      if (ship) {
        setFormData(ship);
      } else {
        navigate('/ships');
      }
    }
  }, [id, isEditing, getShipById, navigate]);

  if (!canManage) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">You don't have permission to manage ships.</p>
        <button
          onClick={() => navigate('/ships')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Ships
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.imo.trim()) {
      newErrors.imo = 'IMO number is required';
    } else if (!/^\d{7}$/.test(formData.imo)) {
      newErrors.imo = 'IMO number must be 7 digits';
    }
    if (!formData.flag.trim()) {
      newErrors.flag = 'Flag is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isEditing) {
        updateShip(id, formData);
      } else {
        addShip(formData);
      }
      navigate('/ships');
    } catch (error) {
      setErrors({ submit: 'Failed to save ship. Please try again.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Ship' : 'Add New Ship'}
        </h1>
        <button
          onClick={() => navigate('/ships')}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow sm:rounded-lg p-6">
        {errors.submit && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Ship Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="imo" className="block text-sm font-medium text-gray-700">
            IMO Number
          </label>
          <input
            type="text"
            name="imo"
            id="imo"
            value={formData.imo}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.imo ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.imo && (
            <p className="mt-2 text-sm text-red-600">{errors.imo}</p>
          )}
        </div>

        <div>
          <label htmlFor="flag" className="block text-sm font-medium text-gray-700">
            Flag
          </label>
          <input
            type="text"
            name="flag"
            id="flag"
            value={formData.flag}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.flag ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.flag && (
            <p className="mt-2 text-sm text-red-600">{errors.flag}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          >
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/ships')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {isEditing ? 'Update Ship' : 'Add Ship'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShipForm;
