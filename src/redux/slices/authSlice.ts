import { createSlice } from "@reduxjs/toolkit";
import { AUTH_TOKEN } from "../../helpers/contants";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    accessToken: null,
    redirectToLogin: false,
    isAuthenticated: false
  },
  reducers: {
    registerUserStart: (
      state,
      action: {
        payload: {
          name: string;
          email: string;
          phone: string;
          password: string;
          receiveWhatsAppUpdates: boolean;
        };
      },
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    registerUserSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        redirectToLogin: true
      };
    },
    registerUserFailure: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },

    setAccessToken: (state, action) => {
      return {
        ...state,
        accessToken: action.payload,
      };
    },
    loginUserStart: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    loginUserSuccess: (state, action) => {
      const { user, token } = action.payload;
      return {
        ...state,
        user: user,
        accessToken: token,
        isLoading: false,
        isAuthenticated: true
      };
    },
    loginUserFailure: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    fetchOnboardingProgressStart: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    fetchOnboardingProgressSuccess: (state, action) => {
      return {
        ...state,
        onboardingProgress: action.payload,
        isLoading: false,
      };
    },
    fetchOnboardingProgressFailure: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    logoutUser: (state) => {
      localStorage.clear();
      return {
        ...state,
        user: null,
        accessToken: null,
        isAuthenticated: false
      };
    },
    resetRedirectToLogin: (state) => {
      return {
        ...state,
        redirectToLogin: false
      }
    }
  },
});

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  fetchOnboardingProgressStart,
  fetchOnboardingProgressSuccess,
  fetchOnboardingProgressFailure,
  setAccessToken,
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  resetRedirectToLogin,
} = authSlice.actions;

export default authSlice.reducer;

export const currentUser = (state: any) => state.auth.user;
export const currentUserToken = (state: any) => state.auth.accessToken;
