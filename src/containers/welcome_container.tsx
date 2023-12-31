import React, { useEffect, useState } from "react";
import WelcomeNav from "../components/welccomeNav";
import RegistrationProgress from "../components/registerProgress";

const WelcomeContainer = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar: () => void = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 h-full flex flex-col overflow-auto">
          <WelcomeNav toggleSidebar={toggleSidebar} />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 rounded-md h-full">
            <div className="flex flex-col lg:flex-row lg:justify-between h-full">
              {/* Left Sidebar */}
              <div className="bg-gray-100 lg:w-[350px] px-5 pb-4 h-full">
                <RegistrationProgress />
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4">{children}</div>

              {/* Right Sidebar (Promotions) */}
              <div className="hidden lg:block lg:w-[350px] p-4">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Promotions</h2>
                  <div className="mb-4">
                    <img src="your-promo-image-1.jpg" alt="Promo 1" className="w-full mb-2" />
                    <img src="your-promo-image-2.jpg" alt="Promo 2" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default WelcomeContainer;
