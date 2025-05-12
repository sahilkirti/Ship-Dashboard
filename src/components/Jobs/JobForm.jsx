import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobs } from '../../contexts/JobsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { useAuth } from '../../contexts/AuthContext';
import { canManageJobs } from '../../utils/roleUtils';

const JobForm = ({ shipId: propShipId }) => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { addJob, updateJob, getJobById } = useJobs();
  const { getComponentsByShipId } = useComponents();
  const { currentUser } = useAuth();
  const canManage = canManageJobs(currentUser?.role);

  const [formData, setFormData] = useState({
    type: '',
    priority: 'Medium',
    status: 'Open',
    componentId: '',
    scheduledDate: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const isEditing = Boolean(jobId);
  const shipId = propShipId || useParams().shipId;
  const components = getComponentsByShipId(shipId);

  useEffect(() => {
    if (isEditing) {
      const job = getJobById(jobId);
      if (job) {
        setFormData(job);
      } else {
        navigate(`/ships/${shipId}/jobs`);
      }
    }
  }, [jobId, isEditing, getJobById, navigate, shipId]);

  if (!canManage) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">You don't have permission to manage jobs.</p>
        <button
          onClick={() => navigate(`/ships/${shipId}/jobs`)}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.type.trim()) {
      newErrors.type = 'Type is required';
    }
    if (!formData.componentId) {
      newErrors.componentId = 'Component is required';
    }
    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'Scheduled date is required';
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
      const jobData = {
        ...formData,
        shipId,
        assignedEngineerId: currentUser.id
      };

      if (isEditing) {
        updateJob(jobId, jobData);
      } else {
        addJob(jobData);
      }
      navigate(`/ships/${shipId}/jobs`);
    } catch (error) {
      setErrors({ submit: 'Failed to save job. Please try again.' });
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
          {isEditing ? 'Edit Job' : 'Add New Job'}
        </h1>
        <button
          onClick={() => navigate(`/ships/${shipId}/jobs`)}
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
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <input
            type="text"
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.type ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.type && (
            <p className="mt-2 text-sm text-red-600">{errors.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="componentId" className="block text-sm font-medium text-gray-700">
            Component
          </label>
          <select
            name="componentId"
            id="componentId"
            value={formData.componentId}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.componentId ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select a component</option>
            {components.map(component => (
              <option key={component.id} value={component.id}>
                {component.name} ({component.serialNumber})
              </option>
            ))}
          </select>
          {errors.componentId && (
            <p className="mt-2 text-sm text-red-600">{errors.componentId}</p>
          )}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
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
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700">
            Scheduled Date
          </label>
          <input
            type="datetime-local"
            name="scheduledDate"
            id="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
              errors.scheduledDate ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.scheduledDate && (
            <p className="mt-2 text-sm text-red-600">{errors.scheduledDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/ships/${shipId}/jobs`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {isEditing ? 'Update Job' : 'Add Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
