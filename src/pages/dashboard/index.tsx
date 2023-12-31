
import DashboardContainer from "../../containers/dashboard_container";
import RequireAuth from "../../containers/require_auth";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your admin dashboard.</p>
      </div>
    </DashboardContainer>
  );
};

export default RequireAuth(Dashboard);
