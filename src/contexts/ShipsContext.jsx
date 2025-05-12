import React, { createContext, useContext, useState, useEffect } from 'react';
import { getData, setData } from '../utils/localStorageUtils';

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const storedShips = getData('ships');
    if (storedShips) setShips(storedShips);
  }, []);

  const addShip = (newShip) => {
    const updated = [...ships, newShip];
    setShips(updated);
    setData('ships', updated);
  };

  const updateShip = (updatedShip) => {
    const updated = ships.map(ship => ship.id === updatedShip.id ? updatedShip : ship);
    setShips(updated);
    setData('ships', updated);
  };

  const deleteShip = (id) => {
    const updated = ships.filter(ship => ship.id !== id);
    setShips(updated);
    setData('ships', updated);
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
