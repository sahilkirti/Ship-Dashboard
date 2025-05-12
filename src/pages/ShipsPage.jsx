import { Routes, Route } from 'react-router-dom';
import ShipList from '../components/Ships/ShipList';
import ShipForm from '../components/Ships/ShipForm';
import ShipDetail from '../components/Ships/ShipDetail';

function ShipsPage() {
  return (
    <Routes>
      <Route path="/" element={<ShipList />} />
      <Route path="new" element={<ShipForm />} />
      <Route path=":id" element={<ShipDetail />} />
    </Routes>
  );
}

export default ShipsPage;
