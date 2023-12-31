import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  return (
    <nav
      className={`fixed inset-y-0 left-0 w-64 px-4 py-6 bg-white border-r border-gray-300 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } duration-300 ease-in-out`}
    >
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button onClick={toggleSidebar} className="lg:hidden text-gray-500 focus:outline-none">
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      
      <ul>
        <li className="mb-4">
          <a href="#" className="flex items-center text-gray-700 hover:text-gray-900">
            <span className="mr-2">
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                ></path>
              </svg>
            </span>
            Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-gray-700 hover:text-gray-900">
            <span className="mr-2">
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2 12h4M18 12h4"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 5a6 6 0 00-6 6h12a6 6 0 00-6-6z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2 12a6 6 0 016-6h12a6 6 0 016 6"
                ></path>
              </svg>
            </span>
            Profile
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center text-gray-700 hover:text-gray-900">
            <span className="mr-2">
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
