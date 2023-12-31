import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProtectedContainerV2 from "./check_auth";

const AuthPageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-auth bg-contain bg-blend-multiply bg-green-400">
      <div className="w-full p-4">
        <img
          src="/vite.svg" // Replace with your logo image source
          alt="Logo"
          className="mx-auto lg:ml-4 max-w-xs lg:max-w-none"
        />
      </div>

      <div className="flex p-6 justify-center items-center flex-grow">{children}</div>
    </div>
  );
};

export default AuthPageContainer;
