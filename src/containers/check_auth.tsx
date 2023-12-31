// Authenticated.js (Higher-order component for requiring authentication)
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckAuth = (WrappedComponent: React.FC) => {
  const AuthComponent = (props: any) => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
      // Check if the user is authenticated
      if (isAuthenticated) {
        // If not authenticated, navigate to the authentication page
        navigate("/dashboard");
      }
    }, [isAuthenticated, navigate]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default CheckAuth;
