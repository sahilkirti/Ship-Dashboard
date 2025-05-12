import React, { createContext, useContext, useState, useEffect } from 'react';
import { getShips, setShips } from '../utils/localStorageUtils';

const ShipsContext = createContext(null);

export const useShips = () => {
  const context = useContext(ShipsContext);
  if (!context) {
    throw new Error('useShips must be used within a ShipsProvider');
  }
  return context;
};

export const ShipsProvider = ({ children }) => {
  const [ships, setShipsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load ships from localStorage
    try {
      const storedShips = getShips();
      setShipsState(storedShips);
    } catch (err) {
      setError('Failed to load ships data');
      console.error('Error loading ships:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addShip = (ship) => {
    try {
      const newShip = {
        id: `s${Date.now()}`,
        ...ship,
        createdAt: new Date().toISOString()
      };
      const updatedShips = [...ships, newShip];
      setShipsState(updatedShips);
      setShips(updatedShips);
      return newShip;
    } catch (err) {
      setError('Failed to add ship');
      console.error('Error adding ship:', err);
      throw err;
    }
  };

  const updateShip = (id, updates) => {
    try {
      const updatedShips = ships.map(ship =>
        ship.id === id ? { ...ship, ...updates, updatedAt: new Date().toISOString() } : ship
      );
      setShipsState(updatedShips);
      setShips(updatedShips);
      return updatedShips.find(ship => ship.id === id);
    } catch (err) {
      setError('Failed to update ship');
      console.error('Error updating ship:', err);
      throw err;
    }
  };

  const deleteShip = (id) => {
    try {
      const updatedShips = ships.filter(ship => ship.id !== id);
      setShipsState(updatedShips);
      setShips(updatedShips);
    } catch (err) {
      setError('Failed to delete ship');
      console.error('Error deleting ship:', err);
      throw err;
    }
  };

  const getShipById = (id) => {
    return ships.find(ship => ship.id === id);
  };

  const getShipsByStatus = (status) => {
    return ships.filter(ship => ship.status === status);
  };

  const getShipsByFlag = (flag) => {
    return ships.filter(ship => ship.flag === flag);
  };

  const value = {
    ships,
    loading,
    error,
    addShip,
    updateShip,
    deleteShip,
    getShipById,
    getShipsByStatus,
    getShipsByFlag
  };

  return (
    <ShipsContext.Provider value={value}>
      {children}
    </ShipsContext.Provider>
  );
};
