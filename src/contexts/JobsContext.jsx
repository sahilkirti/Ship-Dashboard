import React, { createContext, useContext, useState, useEffect } from 'react';
import { getData, setData } from '../utils/localStorageUtils';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const stored = getData('jobs');
    if (stored) setJobs(stored);
  }, []);

  const addJob = (newJob) => {
    const updated = [...jobs, newJob];
    setJobs(updated);
    setData('jobs', updated);
  };

  const updateJob = (updatedJob) => {
    const updated = jobs.map(job =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobs(updated);
    setData('jobs', updated);
  };

  const deleteJob = (id) => {
    const updated = jobs.filter(job => job.id !== id);
    setJobs(updated);
    setData('jobs', updated);
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
