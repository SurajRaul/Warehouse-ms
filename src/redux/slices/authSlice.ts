import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "manager" | "staff";
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSucess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },
  },
});

export const {
  loginStart,
  loginSucess,
  loginFailure,
  logout,
  loadUserFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
