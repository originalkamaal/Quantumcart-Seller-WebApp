import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import LandingPage from "./pages/index.js";
import RegisterStepOne from "./pages/auth/register";
import Dashboard from "./pages/dashboard";
import Welcome from "./pages/auth/welcome";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import authSlice, { loginUserSuccess } from "./redux/slices/authSlice";
import rootSaga from "./redux/sagas";
import VerifyOTP from "./pages/auth/verify-otp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { decodeJwt } from "./helpers/utils";
import Login from "./pages/auth/login";
import { AUTH_TOKEN } from "./helpers/contants";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: [saga],
});

saga.run(rootSaga);

const App = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    const user = decodeJwt(token);
    if (user) {
      store.dispatch(loginUserSuccess({ user, token, isAuthenticated: true }));
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterStepOne />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            {/* <Route path="/onboarding/update-business-details" element={<UpdateBusinessDetails />} />
            <Route path="/onboarding/update-store-details" element={<UpdateStoreDetails />} /> */}
            <Route path="/onboarding" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

const root = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(root).render(<App />);
