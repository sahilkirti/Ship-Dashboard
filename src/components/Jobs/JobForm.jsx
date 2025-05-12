import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, setData } from '../../utils/localStorageUtils';

const JobForm = () => {
  const { shipId, jobId } = useParams();
  const navigate = useNavigate();

  const jobs = getData('jobs') || [];
  const existingJob = jobs.find(job => job.id === jobId);

  const [formData, setFormData] = useState(
    existingJob || {
      componentId: '',
      type: '',
      priority: 'Medium',
      status: 'Open',
      assignedEngineerId: '',
      scheduledDate: ''
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      ...formData,
      shipId,
      id: jobId || `j${Date.now()}`
    };

    if (jobId) {
      const updatedJobs = jobs.map(job => job.id === jobId ? newJob : job);
      setData('jobs', updatedJobs);
    } else {
      setData('jobs', [...jobs, newJob]);
    }

    navigate(`/ships/${shipId}/jobs`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4 font-semibold">
        {jobId ? 'Edit Job' : 'Add New Job'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Component ID</label>
          <input
            name="componentId"
            value={formData.componentId}
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
        <div>
          <label className="block mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Assigned Engineer ID</label>
          <input
            name="assignedEngineerId"
            value={formData.assignedEngineerId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Scheduled Date</label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {jobId ? 'Update Job' : 'Save Job'}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
