import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import React from "react";

const DashboardNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between p-4 px-10">
        <div className="flex gap-10">
          <button className="text-gray-500 focus:outline-none lg:hidden" onClick={toggleSidebar}>
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>

          
          <div className="flex items-center pr-10">
            <img className="w-8 h-8 rounded-full" src="/vite.svg" alt="User" />
          </div>
        </div>

        

        <nav className="justify-start w-full hidden lg:flex space-x-4">
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Dashboard
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Profile
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Settings
          </a>
          
        </nav>
        
        <div className="flex items-center space-x-6">
          
          <IoSearchOutline color="#000" size={30} />
          <IoNotificationsOutline color="#000" size={30} />

          
          <img className="w-8 h-8 rounded-full mr-9" src="/user.png" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;
