import { Navigate } from 'react-router-dom';
import { getData } from '../utils/localStorageUtils';

function ProtectedRoute({ children }) {
  const currentUser = getData('currentUser');
  if (!currentUser) return <Navigate to="/" />;
  return children;
}

export default ProtectedRoute;
