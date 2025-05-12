// localStorage utility functions with error handling and type checking

const STORAGE_KEYS = {
  USER: 'ship_dashboard_user',
  SHIPS: 'ship_dashboard_ships',
  COMPONENTS: 'ship_dashboard_components',
  JOBS: 'ship_dashboard_jobs',
  NOTIFICATIONS: 'ship_dashboard_notifications'
};

// Default data
const DEFAULT_DATA = {
  users: [
    { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123", name: "Admin User" },
    { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123", name: "Inspector User" },
    { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123", name: "Engineer User" }
  ],
  ships: [
    { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
    { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "Under Maintenance" }
  ],
  components: [
    { id: "c1", shipId: "s1", name: "Main Engine", serialNumber: "ME-1234", installDate: "2020-01-10", lastMaintenanceDate: "2024-03-12" },
    { id: "c2", shipId: "s2", name: "Radar", serialNumber: "RAD-5678", installDate: "2021-07-18", lastMaintenanceDate: "2023-12-01" }
  ],
  jobs: [
    { id: "j1", componentId: "c1", shipId: "s1", type: "Inspection", priority: "High", status: "Open", assignedEngineerId: "3", scheduledDate: "2025-05-05" }
  ]
};

// Helper function to get data from localStorage
export const getData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error getting data from localStorage: ${error}`);
    return null;
  }
};

// Helper function to set data in localStorage
export const setData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting data in localStorage: ${error}`);
    return false;
  }
};

// Helper function to remove data from localStorage
export const removeData = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data from localStorage: ${error}`);
    return false;
  }
};

// Helper function to clear all data from localStorage
export const clearData = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
    return false;
  }
};

// Helper function to get user data
export const getUser = () => {
  return getData(STORAGE_KEYS.USER);
};

// Helper function to set user data
export const setUser = (user) => {
  return setData(STORAGE_KEYS.USER, user);
};

// Helper function to remove user data
export const removeUser = () => {
  return removeData(STORAGE_KEYS.USER);
};

// Helper function to get users data
export const getUsers = () => {
  const users = getData(STORAGE_KEYS.USER);
  return users || DEFAULT_DATA.users;
};

// Helper function to set users data
export const setUsers = (users) => {
  return setData(STORAGE_KEYS.USER, users);
};

// Helper function to get ships data
export const getShips = () => {
  const ships = getData(STORAGE_KEYS.SHIPS);
  return ships || DEFAULT_DATA.ships;
};

// Helper function to set ships data
export const setShips = (ships) => {
  return setData(STORAGE_KEYS.SHIPS, ships);
};

// Helper function to get components data
export const getComponents = () => {
  const components = getData(STORAGE_KEYS.COMPONENTS);
  return components || DEFAULT_DATA.components;
};

// Helper function to set components data
export const setComponents = (components) => {
  return setData(STORAGE_KEYS.COMPONENTS, components);
};

// Helper function to get jobs data
export const getJobs = () => {
  const jobs = getData(STORAGE_KEYS.JOBS);
  return jobs || DEFAULT_DATA.jobs;
};

// Helper function to set jobs data
export const setJobs = (jobs) => {
  return setData(STORAGE_KEYS.JOBS, jobs);
};

// Helper function to get notifications
export const getNotifications = () => {
  return getData(STORAGE_KEYS.NOTIFICATIONS) || [];
};

// Helper function to set notifications
export const setNotifications = (notifications) => {
  return setData(STORAGE_KEYS.NOTIFICATIONS, notifications);
};

// Helper function to add a notification
export const addNotification = (notification) => {
  const notifications = getNotifications();
  notifications.unshift({
    ...notification,
    id: Date.now(),
    timestamp: new Date().toISOString()
  });
  return setNotifications(notifications);
};

// Helper function to remove a notification
export const removeNotification = (id) => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.filter(n => n.id !== id);
  return setNotifications(updatedNotifications);
};

// Helper function to clear all notifications
export const clearNotifications = () => {
  return setNotifications([]);
};

// Initialize default data if not exists
export const initializeDefaultData = () => {
  if (!getShips().length) setShips(DEFAULT_DATA.ships);
  if (!getComponents().length) setComponents(DEFAULT_DATA.components);
  if (!getJobs().length) setJobs(DEFAULT_DATA.jobs);
};

// Authenticate user
export const authenticateUser = (email, password) => {
  const users = getUsers();
  return users.find(user => user.email === email && user.password === password);
};
