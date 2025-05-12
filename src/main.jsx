import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import App from './App.jsx';
import { initMockData } from './utils/localStorageUtils';
import { AuthProvider } from './contexts/AuthContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';

initMockData();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ShipsProvider>
        <ComponentsProvider>
          <JobsProvider>
            <App />
          </JobsProvider>
        </ComponentsProvider>
      </ShipsProvider>
    </AuthProvider>
  </StrictMode>
);
