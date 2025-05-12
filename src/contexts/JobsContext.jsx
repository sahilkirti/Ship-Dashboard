import { createContext, useContext, useState, useEffect } from 'react';
import { getJobs, setJobs } from '../utils/localStorageUtils';

const JobsContext = createContext(null);

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};

export const JobsProvider = ({ children }) => {
  const [jobs, setJobsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load jobs from localStorage
    try {
      const storedJobs = getJobs();
      setJobsState(storedJobs);
    } catch (err) {
      setError('Failed to load jobs data');
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addJob = (job) => {
    try {
      const newJob = {
        id: `j${Date.now()}`,
        ...job,
        status: 'Open',
        createdAt: new Date().toISOString()
      };
      const updatedJobs = [...jobs, newJob];
      setJobsState(updatedJobs);
      setJobs(updatedJobs);
      return newJob;
    } catch (err) {
      setError('Failed to add job');
      console.error('Error adding job:', err);
      throw err;
    }
  };

  const updateJob = (id, updates) => {
    try {
      const updatedJobs = jobs.map(job =>
        job.id === id ? { ...job, ...updates, updatedAt: new Date().toISOString() } : job
      );
      setJobsState(updatedJobs);
      setJobs(updatedJobs);
      return updatedJobs.find(job => job.id === id);
    } catch (err) {
      setError('Failed to update job');
      console.error('Error updating job:', err);
      throw err;
    }
  };

  const deleteJob = (id) => {
    try {
      const updatedJobs = jobs.filter(job => job.id !== id);
      setJobsState(updatedJobs);
      setJobs(updatedJobs);
    } catch (err) {
      setError('Failed to delete job');
      console.error('Error deleting job:', err);
      throw err;
    }
  };

  const getJobById = (id) => {
    return jobs.find(job => job.id === id);
  };

  const getJobsByShipId = (shipId) => {
    return jobs.filter(job => job.shipId === shipId);
  };

  const getJobsByComponentId = (componentId) => {
    return jobs.filter(job => job.componentId === componentId);
  };

  const getJobsByStatus = (status) => {
    return jobs.filter(job => job.status === status);
  };

  const getJobsByPriority = (priority) => {
    return jobs.filter(job => job.priority === priority);
  };

  const getJobsByDate = (date) => {
    const targetDate = new Date(date);
    return jobs.filter(job => {
      const jobDate = new Date(job.scheduledDate);
      return (
        jobDate.getDate() === targetDate.getDate() &&
        jobDate.getMonth() === targetDate.getMonth() &&
        jobDate.getFullYear() === targetDate.getFullYear()
      );
    });
  };

  const getJobsByEngineer = (engineerId) => {
    return jobs.filter(job => job.assignedEngineerId === engineerId);
  };

  const updateJobStatus = (id, status) => {
    try {
      const updatedJobs = jobs.map(job =>
        job.id === id ? { ...job, status, updatedAt: new Date().toISOString() } : job
      );
      setJobsState(updatedJobs);
      setJobs(updatedJobs);
      return updatedJobs.find(job => job.id === id);
    } catch (err) {
      setError('Failed to update job status');
      console.error('Error updating job status:', err);
      throw err;
    }
  };

  const assignEngineer = (id, engineerId) => {
    try {
      const updatedJobs = jobs.map(job =>
        job.id === id ? { ...job, assignedEngineerId: engineerId, updatedAt: new Date().toISOString() } : job
      );
      setJobsState(updatedJobs);
      setJobs(updatedJobs);
      return updatedJobs.find(job => job.id === id);
    } catch (err) {
      setError('Failed to assign engineer');
      console.error('Error assigning engineer:', err);
      throw err;
    }
  };

  const value = {
    jobs,
    loading,
    error,
    addJob,
    updateJob,
    deleteJob,
    getJobById,
    getJobsByShipId,
    getJobsByComponentId,
    getJobsByStatus,
    getJobsByPriority,
    getJobsByDate,
    getJobsByEngineer,
    updateJobStatus,
    assignEngineer
  };

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
};
