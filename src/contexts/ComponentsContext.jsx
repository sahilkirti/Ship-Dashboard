import React, { createContext, useContext, useState, useEffect } from 'react';
import { getComponents, setComponents } from '../utils/localStorageUtils';

const ComponentsContext = createContext(null);

export const useComponents = () => {
  const context = useContext(ComponentsContext);
  if (!context) {
    throw new Error('useComponents must be used within a ComponentsProvider');
  }
  return context;
};

export const ComponentsProvider = ({ children }) => {
  const [components, setComponentsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load components from localStorage
    try {
      const storedComponents = getComponents();
      setComponentsState(storedComponents);
    } catch (err) {
      setError('Failed to load components data');
      console.error('Error loading components:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addComponent = (component) => {
    try {
      const newComponent = {
        id: `c${Date.now()}`,
        ...component,
        createdAt: new Date().toISOString()
      };
      const updatedComponents = [...components, newComponent];
      setComponentsState(updatedComponents);
      setComponents(updatedComponents);
      return newComponent;
    } catch (err) {
      setError('Failed to add component');
      console.error('Error adding component:', err);
      throw err;
    }
  };

  const updateComponent = (id, updates) => {
    try {
      const updatedComponents = components.map(component =>
        component.id === id ? { ...component, ...updates, updatedAt: new Date().toISOString() } : component
      );
      setComponentsState(updatedComponents);
      setComponents(updatedComponents);
      return updatedComponents.find(component => component.id === id);
    } catch (err) {
      setError('Failed to update component');
      console.error('Error updating component:', err);
      throw err;
    }
  };

  const deleteComponent = (id) => {
    try {
      const updatedComponents = components.filter(component => component.id !== id);
      setComponentsState(updatedComponents);
      setComponents(updatedComponents);
    } catch (err) {
      setError('Failed to delete component');
      console.error('Error deleting component:', err);
      throw err;
    }
  };

  const getComponentById = (id) => {
    return components.find(component => component.id === id);
  };

  const getComponentsByShipId = (shipId) => {
    return components.filter(component => component.shipId === shipId);
  };

  const getComponentsNeedingMaintenance = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return components.filter(component => {
      const lastMaintenance = new Date(component.lastMaintenanceDate);
      return lastMaintenance < thirtyDaysAgo;
    });
  };

  const updateMaintenanceDate = (id, date) => {
    try {
      const updatedComponents = components.map(component =>
        component.id === id ? { ...component, lastMaintenanceDate: date } : component
      );
      setComponentsState(updatedComponents);
      setComponents(updatedComponents);
      return updatedComponents.find(component => component.id === id);
    } catch (err) {
      setError('Failed to update maintenance date');
      console.error('Error updating maintenance date:', err);
      throw err;
    }
  };

  const value = {
    components,
    loading,
    error,
    addComponent,
    updateComponent,
    deleteComponent,
    getComponentById,
    getComponentsByShipId,
    getComponentsNeedingMaintenance,
    updateMaintenanceDate
  };

  return (
    <ComponentsContext.Provider value={value}>
      {children}
    </ComponentsContext.Provider>
  );
};
