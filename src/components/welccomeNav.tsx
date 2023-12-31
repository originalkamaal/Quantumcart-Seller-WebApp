import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const WelcomeNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="">
      <div className="flex items-center justify-between p-4 px-10">
        <div className="flex items-center pr-10">
          <img className="w-8 h-8 rounded-full" src="/vite.svg" alt="User" />
        </div>

        <div className="flex items-center space-x-6">
          <div className="font-semibold uppercase" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default WelcomeNav;
