import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/ships" className="hover:underline">Ships</Link>
        <Link to="/jobs" className="hover:underline">Jobs</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-700">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
