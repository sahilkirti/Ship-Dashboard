import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';
import Navbar from './components/Navbar';
import ComponentList from './components/Components/ComponentList';
import ComponentForm from './components/Components/ComponentForm';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/ships/*" element={<ProtectedRoute><ShipsPage /></ProtectedRoute>} />
        <Route path="/ships/:id" element={<ProtectedRoute><ShipDetailPage /></ProtectedRoute>} />
        <Route path="/ships/:shipId/jobs/*" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
        <Route path="/ships/:shipId/components" element={<ComponentList />} />
        <Route path="/ships/:shipId/components/new" element={<ComponentForm />} />
        <Route path="/ships/:shipId/components/:componentId" element={<ComponentForm />} />     
      </Routes>
    </Router>
  );
}

export default App;
