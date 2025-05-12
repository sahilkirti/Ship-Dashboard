import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';

const DashboardPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <KPICards />
      <Charts />
    </div>
  );
};

export default DashboardPage;
