import React, { createContext, useContext, useState, useEffect } from 'react';
import { getData, setData } from '../utils/localStorageUtils';

const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const stored = getData('components');
    if (stored) setComponents(stored);
  }, []);

  const addComponent = (newComponent) => {
    const updated = [...components, newComponent];
    setComponents(updated);
    setData('components', updated);
  };

  const updateComponent = (updatedComponent) => {
    const updated = components.map(comp =>
      comp.id === updatedComponent.id ? updatedComponent : comp
    );
    setComponents(updated);
    setData('components', updated);
  };

  const deleteComponent = (id) => {
    const updated = components.filter(comp => comp.id !== id);
    setComponents(updated);
    setData('components', updated);
  };

  return (
    <ComponentsContext.Provider
      value={{ components, addComponent, updateComponent, deleteComponent }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponents = () => useContext(ComponentsContext);
